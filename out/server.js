import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
import { v4 as uuidv4 } from 'uuid';
import Author from './models/Author.js';
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
}); // Enable foreign key constraints
//await db.exec('PRAGMA foreign_keys = ON');
// Use routes
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
// Setup database and store the db connection
// Authors Routes 
app.get("/authors/all", async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    }
    catch (error) {
        res.status(0);
    }
});
app.get("/authors/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("ID: " + id);
    const result = await db.get("SELECT * FROM authors WHERE id = ?", [1]);
    console.log(result);
    try {
        // Fetch author by ID from the database
        console.log("Flag1");
        const result = await db.get("SELECT * FROM authors WHERE id = ?", [id]);
        console.log("Flag2");
        if (author) {
            res.json({ author });
            res.status(201).json({ message: "Found Author" });
        }
        else {
            res.status(404).json({ message: `Author with ID ${id} not found` });
        }
    }
    catch (error) {
        res.status(600).json({ message: 'Internal server error' });
    }
});
app.post('/authors', async (req, res) => {
    try {
        const { name, bio } = req.body;
        const authorId = Math.floor(Math.random() * 1000); // Generate a random integer between 0 and 999
        await db.run('INSERT INTO authors (id, name, bio) VALUES (?, ?, ?)', authorId, name, bio);
        res.status(201).json({ message: "Created new author", authorId });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/authors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the author exists in the database
        const author = await db.get('SELECT * FROM authors WHERE id = ?', id);
        if (!author) {
            res.status(404).json({ message: `Author with ID ${id} not found` });
        }
        else {
            // Check if the author has any books in the book database
            const authorBooks = await db.get('SELECT * FROM books WHERE author_id = ?', id);
            if (authorBooks) {
                res.status(400).json({ message: `Author with ID ${id} has books in the book database. Cannot delete.` });
            }
            else {
                // Delete author by ID from the database
                await db.run('DELETE FROM authors WHERE id = ?', id);
                res.status(200).json({ message: `Deleted author with ID ${id}` });
            }
        }
    }
    catch (error) {
        res.status(600).json({ message: 'Internal server error' });
    }
});
// Books Routes
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch book by ID from the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', id);
        if (book) {
            res.json({ book });
        }
        else {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/books', async (req, res) => {
    const { id, author_id, pub_year } = req.query;
    try {
        let query = 'SELECT * FROM books';
        if (id || author_id || pub_year) {
            query += ' WHERE';
            if (id) {
                query += ' id = ?';
            }
            if ((id && author_id) || (id && pub_year)) {
                query += ' AND';
            }
            if (author_id) {
                query += ' author_id = ?';
            }
            if ((author_id && pub_year) || (id && pub_year)) {
                query += ' AND';
            }
            if (pub_year) {
                query += ' pub_year >= ?';
            }
        }
        const params = [];
        if (id) {
            params.push(id);
        }
        if (author_id) {
            params.push(author_id);
        }
        if (pub_year) {
            params.push(pub_year);
        }
        const books = await db.all(query, params);
        if (books.length > 0) {
            res.json({ books });
        }
        else {
            res.status(404).json({ message: 'No books found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.post('/books', async (req, res) => {
    const { author_id, title, pub_year, genre } = req.body;
    try {
        // Check if the author exists in the database
        const author = await db.get('SELECT * FROM authors WHERE id = ?', author_id);
        if (!author) {
            return res.status(404).json({ message: `Author with ID ${author_id} not found` });
        }
        // Insert the new book into the database
        await db.run('INSERT INTO books (id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)', [uuidv4(), author_id, title, pub_year, genre]);
        res.status(201).json({ message: "Created new book" });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch book by ID from the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', id);
        if (book) {
            res.json({ book });
        }
        else {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the book exists in the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', id);
        if (!book) {
            return res.status(404).json({ message: `Book with ID ${id} not found` });
        }
        // Delete book by ID from the database
        await db.run('DELETE FROM books WHERE id = ?', id);
        res.status(200).json({ message: `Deleted book with ID ${id}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default app;
