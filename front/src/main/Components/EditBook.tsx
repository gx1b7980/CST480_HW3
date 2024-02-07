import React, { useState, useEffect } from "react";
import axios from "axios";
import { bookList as bookListType, getAxiosErrorMessages } from "./utils";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Box, Typography, Container } from "@mui/material";

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;

function EditBook() {
    const [messages, setMessages] = useState<string[]>([]);
    const [bookList, setBookList] = useState<bookListType[]>([]);
    const [title, setTitle] = useState("");
    const [book_id, setBook_id] = useState("");
    const [author, setAuthor] = useState("");
    const [pub_year, setPub_year] = useState("");
    const [genre, setGenre] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data: fetchedBooks } = await axios.get("/api/books/");
                setBookList(fetchedBooks);
            } catch (error) {
                console.error("Error in EditBook:", getAxiosErrorMessages(error));
            }
        })();
    }, []);

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
            setMessages(['"'+ title+ '"'+" Successfully Edited"]);
        } catch(error) {
            console.log("Error in Editbook.tsx");
            console.log(getAxiosErrorMessages(error));
        }
    };
    /*
    function SubmitButton() {
        return <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>;
    }
    
    function DeleteButton() {
        return <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>;
    }*/

    let handleDelete = async function () {
        try {
            await axios.delete(`/api/books/${book_id}`);
            setMessages(['"'+ title+ '"'+" Successfully Deleted"]);
            setAuthor("");
            setTitle("");
            setPub_year("");
            setGenre("");
            location.reload();
        } catch(error) {
            console.log("Error in Editbook.tsx");
            console.log(getAxiosErrorMessages(error));
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
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" gutterBottom>Edit Book</Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-book-label">Select a Book</InputLabel>
                    <Select
                        labelId="select-book-label"
                        value={book_id}
                        onChange={(e) => setVars(parseInt(e.target.value))}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {bookList.map(({ id, title }) => (
                            <MenuItem key={id} value={id}>{title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Author"
                    fullWidth
                    margin="normal"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    label="Publication Year"
                    fullWidth
                    margin="normal"
                    value={pub_year}
                    onChange={(e) => setPub_year(e.target.value)}
                />
                <TextField
                    label="Genre"
                    fullWidth
                    margin="normal"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>
                {messages.length > 0 && (
                    <Box mt={2}>
                        {messages.map((message, index) => (
                            <Typography key={index} color="error">
                                {message}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default EditBook;