import { useState, useEffect } from "react";
import { authorList, bookList, getAxiosErrorMessages } from "./utils";
import axios from "axios";
import "./repository.css";


let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function Repository() {
    let [authorTable, setAuthorList] = useState<authorList[]>([]);
    let [bookList, setBookList] = useState<bookList[]>([]);
    //axios.post("/api/authors/post", { id: 1, a_name: "John Doe", bio: "Lorem ipsum dolor sit amet" });
    //let res = (async () => await axios.get("/api/authors/all"))();
    
    //console.log("DATA"+res);
    useEffect(() => {
        (async () => {
            //console.log("Repository component");
            //await axios.post("/api/authors/post", { id: 1, a_name: "John Doe", bio: "Lorem ipsum dolor sit amet" });
            //let res = await axios.get("/api/authors/all");
            //console.log("DATAD"+res.data);
            try{
                let {data: authorTable} = await axios.get("/api/authors/all");
                setAuthorList(authorTable);
                console.log(authorTable);
                console.log("BIGCHECK");
                
                let {
                    data: { bookList },
                } = await axios.get("/api/books/");
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
            
            <h4>console.log("HAHA")</h4>
            <h2>Author Database Info</h2>
            
                <table>
                    <thead>
                        <tr>
                            <th>AuthorID</th>
                            <th>Author Name</th>
                            <th>Author Bio</th>
                        </tr>
                    </thead>
                    {/*<tbody>
                            <tr>
                                <td>R1{authorTable.length}</td>
                                <td>R1R1</td>
                                <td>R1R1R1</td>
                            </tr>
                    </tbody>*/}
                    <tbody>
                        {authorTable
                            .map(({ 
                                id, 
                                a_name, 
                                bio 
                            }) => (
                                <tr key={id}>
                                        <td key={`${id}-id`}>{id}</td>
                                        <td key={`${id}-a_name`}>{a_name}</td>
                                        <td key={`${id}bio`}>{bio}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            
            

            <h2>Book Database Info</h2>
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
                    {/*<tbody>
                        {bookList.map((books) => (
                            <tr key={books.id}>
                                <td>{books.id}</td>
                                <td>{books.title}</td>
                                <td>{books.author_id}</td>
                                <td>{books.genre}</td>
                                <td>{books.pub_year}</td>
                            </tr>
                        ))}
                        </tbody>*/}
                </table>
            </div>
            </>
)};

export default Repository;