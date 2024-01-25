import { useState, useEffect } from "react";
import axios from "axios";
export default function Repository() {
    let [authorTable, setAuthorList] = useState([]);
    let [bookList, setBookList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                let { data: { authorTable }, } = await axios.get("/api/authors");
            }
            finally {
            }
        });
    });
}
