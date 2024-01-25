import React from "react";
import { useState, useEffect } from "react";
import { authorList, bookList, getAxiosErrorMessages } from "./utils";
import axios from "axios";

export default function Repository() {
    let [authorTable, setAuthorList] = useState<authorList[]>([]);
    let [bookList, setBookList] = useState<bookList[]>([]);

    useEffect(() => {
        (async () => {
            try{
                let {
                    data: { authorTable },
                } = await axios.get("/api/authors");
            }
}