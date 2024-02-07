import { useState, useEffect } from "react";
import axios from "axios";
import { authorList, bookList, getAxiosErrorMessages } from "./utils";
import "./repository.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function BookTable() {
    const [bookList, setBookList] = useState<bookList[]>([]);
    const [authorTable, setAuthorList] = useState<authorList[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const { data: fetchedAuthors } = await axios.get("/api/authors/all");
                setAuthorList(fetchedAuthors);
                const { data: fetchedBooks } = await axios.get("/api/books/");
                setBookList(fetchedBooks);
            } catch (error) {
                console.error("Error in BookTable:", getAxiosErrorMessages(error));
            }
        })();
    }, []);

    return (
        <>
            <h1>Book Database</h1>
            <b>Use the following DropDown to select the category you want to search in</b>
            <div id="Category Box">
                <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    <option value="pub_year">Year</option>
                </select>
            </div>
            <b>Use the following search box to search for a book</b>
            <div id="Search Box">
                <input
                    type="text"
                    placeholder="Search...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <TableContainer component={Paper} id="bookTable">
                <Table aria-label="book table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Book ID</TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Book Author</TableCell>
                            <TableCell>Book Genre</TableCell>
                            <TableCell>Book Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookList.filter(book => {
                            let filterPass = true;
                            if (searchCategory && searchTerm) {
                                switch (searchCategory) {
                                    case 'title':
                                        filterPass = book.title.toLowerCase().includes(searchTerm.toLowerCase());
                                        break;
                                    case 'author':
                                        const authorName = authorTable.find(author => author.id === book.author_id)?.a_name.toLowerCase() || '';
                                        filterPass = authorName.includes(searchTerm.toLowerCase());
                                        break;
                                    case 'genre':
                                        filterPass = book.genre.toLowerCase().includes(searchTerm.toLowerCase());
                                        break;
                                    case 'pub_year':
                                        filterPass = book.pub_year.toString().includes(searchTerm);
                                        break;
                                    default:
                                        filterPass = true;
                                }
                            }
                            return filterPass;
                        }).map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{authorTable.find(author => author.id === book.author_id)?.a_name}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>{book.pub_year}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BookTable;
