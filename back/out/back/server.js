import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
const app = express();
app.use(express.json());
let author = [{ id: 9, name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' },];
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
sqlite3.verbose(); // enable better error messages
let db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
});
// Use routes
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
export default app;
