import "./AddBook.css"
import { useState } from "react";
import  axios from "axios";
//import { getAxiosErrorMessages } from "./utils";

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
            const res = await axios.get(`/api/authors/name/${author}`,);
            let a_id;

            console.log("Flag 6"+res.status)
            if(res.status == 404){
                const name = author;
                const bio = "";
                const auth = {name, bio}
                a_id = (await axios.post("/api/authors/post",auth)).data.lastID;
                console.log("Flag 5: "+a_id);
            }else{
                a_id = res.data;
            }
            console.log("Flag 4");
            console.log("Flag 1");
            let id=1111;
            const entry = {id: id, author_id: a_id, title: title, pub_year: pub_year, genre: genre};
            console.log(entry);
            await axios.post('/api/books/post', entry);
            console.log("Flag 3");
            setMessages(["Widget successfully added"]);
        }catch (error) {
            console.log("Error in AddBook.tsx");
            //console.log(getAxiosErrorMessages(error));
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