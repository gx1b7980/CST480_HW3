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
            console.log("Flag 2");
            console.log(author);
            let res = await axios.get(`/api/authors/name/${author}`,);
            console.log("Flag 7");
            let a_id;

            console.log("Flag 6: "+res.status)
            if(res.status == 404){
                const name = author;
                const bio = "";
                const auth = {name, bio}
                console.log("Flag 4");
                a_id = (await axios.post("/api/authors/post",auth)).data.lastID;
                
            }else{
                a_id = (await axios.get(`/api/authors/name/${author}`)).data;
                console.log("Flag 5: "+a_id);
            }
            const entry = {author_id: a_id, title: title, pub_year: pub_year, genre: genre};
            console.log(entry);
            await axios.put('/api/books/edit', entry);
            console.log("Flag 3");
            setMessages(["Widget successfully added"]);
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
                    <div className="error-message">
                    {messages.map((message, i) => (
                        <div key={i}>{message}</div>
                    ))}
                </div>
        </div>
        
    );
}

export default EditBook;
