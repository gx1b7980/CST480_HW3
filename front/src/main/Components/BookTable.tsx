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
    useEffect(() => {
        (async () => {
            try{
                let {data: authorTable} = await axios.get("/api/authors/all");
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

            <h1>Book Database with Title Searching</h1>
            <h3>Search by Book Title</h3>
            <div>
                <input
                    type="text"
                    placeholder="Search by Book Title..."
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
                        .filter(({ title }) => title.toLowerCase().includes(searchTerm.toLowerCase()))
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
