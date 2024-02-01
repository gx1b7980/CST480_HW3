import "./editBook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { authorList, bookList, getAxiosErrorMessages } from "./utils";

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function EditBook() {
    let [messages, setMessages] = useState<string[]>([]);
    let [bookList, setBookList] = useState<bookList[]>([]);
    const [title, setTitle] = useState("");
    const [book_id, setBook_id] = useState(Number);
    const [author, setAuthor] = useState("");
    const [pub_year, setPub_year] = useState("");
    const [genre, setGenre] = useState("");

    useEffect(() => {
        (async () => {
            try{
                let {data: bookList} = await axios.get("/api/books/");
                setBookList(bookList);
            }
            catch (error) {
                console.log("Error in Repository.tsx");
                console.log(getAxiosErrorMessages(error));
            }
        })(); 
    },[]);  

    let handleSubmit = async function () {
        try {
            // Your submit logic here
        } catch {
            // Error handling logic here
        }
    };

    let setVars = async function (id: Number) {
        try{
            let {data: bookList} = await axios.get(`/api/books/${id}`);
            setBook_id(bookList.id);
            setTitle(bookList.title);
            setPub_year(bookList.pub_year);
            setGenre(bookList.genre);
            setAuthor((await axios.get(`/api/authors/${bookList.author_id}`)).data.a_name);
        }catch (error) {
            console.log("Error in EditBook.tsx");
            console.log(getAxiosErrorMessages(error));
        }

    };

    return (
        <div>
            <select value={book_id} onChange={(e) => setVars(parseInt(e.target.value))}>
                <option value="">Select a book</option>
                {bookList.map(({id, title}) => (
                    <option key={id} value={id} >
                        {title}
                    </option>
                    
                ))}
            </select>
            <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        Author:
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        Publication Year:
                        <input type="text" value={pub_year} onChange={(e) => setPub_year(e.target.value)} />
                        Genre:
                        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                        <input type="submit" value="Submit" onClick={handleSubmit} />
                    </label>
        </div>
    );
}

export default EditBook;
