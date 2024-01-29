import { useState, useEffect } from "react";
import { authorList, bookList, getAxiosErrorMessages } from "./utils";
import axios from "axios";
import "./repository.css";


let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function BookTable() {
    let [bookList, setBookList] = useState<bookList[]>([]);
    let [authorTable, setAuthorList] = useState<authorList[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    useEffect(() => {
        (async () => {
            try{
                let {data: authorTable} = await axios.get("/api/authors/all");
                console.log("ATABLE IS"+authorTable.length);
                setAuthorList(authorTable);
                let {data: bookList} = await axios.get("/api/books/");
                setBookList(bookList);
            }
            catch (error) {
                console.log("Error in Repository.tsx");
                console.log(getAxiosErrorMessages(error));
            }
        })(); 
    },[]);   
    return (
        <>

            <h1>Book Database</h1>
            <b>Use the following DropDown to select the category you want to search in</b>
            <div id="Category Box">
                <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    <option value="pub_year">Year</option>
                </select>
            </div>
            {console.log(searchCategory)}
            <b>Use the following search box to search for a book</b>
            <div id="Search Box">
                <input
                    type="text"
                    placeholder="Search...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div id="bookTable"> 
                <table>
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Book Title</th>
                            <th>Book Author</th>
                            <th>Book Genre</th>
                            <th>Book Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList
                        .filter(({
                            title, author_id, genre, pub_year
                        }) => {
                            if (searchCategory === "title") {
                                return title.toLowerCase().includes(searchTerm.toLowerCase());
                            }
                            else if (searchCategory === "author") {
                                return authorTable.find(({ id }) => id === author_id)?.a_name.toLowerCase().includes(searchTerm.toLowerCase());
                            }
                            else if (searchCategory === "genre") {
                                return genre.toLowerCase().includes(searchTerm.toLowerCase());
                            }
                            else if (searchCategory === "pub_year") {
                                return pub_year.toString().includes(searchTerm);
                            }
                            else {
                                return title.toLowerCase().includes(searchTerm.toLowerCase());
                            }
                        })
                        .map(({
                            id, author_id, title, pub_year, genre
                        }) => (
                            <tr key={id}>
                                <td key={`${id}-id`}>{id}</td>
                                <td key={`${id}-title`}>{title}</td>
                                <td key={`${id}-author_id`}>
                                    {
                                        authorTable.find(({ id }) => id === author_id)?.a_name
                                    }</td>
                                <td key={`${id}-genre`}>{genre}</td>
                                <td key={`${id}-pub_year`}>{pub_year}</td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
            </>
)};


export default BookTable;
