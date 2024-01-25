import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import axios from 'axios';
let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;
axios.defaults.baseURL = baseURL;
sqlite3.verbose(); // enable better error messages
let db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
});
//const result = await db.get("SELECT * FROM authors WHERE id = ?", [0]);
const funct = (async () => {
    //const response = await axios.get(`/api/authors/all/`);
    //return (response.data.widget);
    return "response";
});
export { funct };
