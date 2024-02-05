import "./AddBook.css"
import { useState } from "react";
import  axios from "axios";
import { getAxiosErrorMessages } from "./utils";

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function AddBook() {
    let [messages, setMessages] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pub_year, setPub_year] = useState("");
    const [genre, setGenre] = useState("");


    let handleSubmit = async function () {
        try{
            console.log("Flag 2");
            console.log(author);
            let a_id;
            try{
                console.log("Flag 7");
                let res ;
                res = await axios.get(`/api/authors/name/${author}`, {
                    timeout: 5000 
                });
                console.log("Flag 6: "+res.status)
                
                a_id = (await axios.get(`/api/authors/name/${author}`,));
                
                
            }catch (error) {
                console.log("Error in AddBook.tsx Add Author");
                const name = author;
                console.log("Name is"+name);
                const bio = "";
                const auth = {name, bio}
                console.log("Flag 4");
                let add_req = await axios.post("/api/authors/post",auth);
                a_id = add_req.data.lastID;
                console.log("Flag 5: "+a_id);
            }
            const entry = {author_id: a_id, title: title, pub_year: pub_year, genre: genre};
            console.log(entry);
            await axios.post('/api/books/post', entry);
            console.log("Flag 3");
            setMessages(["Widget successfully added"]);
        }catch (error) {
            console.log("Error in AddBook.tsx");
            console.log(getAxiosErrorMessages(error));
        }
    }
    
    return (
        <>
            <h1>Add a new book using the following form:</h1>
            <div className="addBook">
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
        </>
    );
}

export default AddBook;