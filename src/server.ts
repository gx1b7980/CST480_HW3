import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as url from 'url';
import authorsRouter  from './routes/authors.js'; // Adjust the import based on your actual file
import booksRouter from './routes/books.js'; // Adjust the import based on your actual file
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const dbfile = `${__dirname}/database.db`;

// Open the database
const db = await open({
    filename: dbfile,
    driver: sqlite3.Database
});

// Enable foreign key constraints
await db.exec('PRAGMA foreign_keys = ON');

// Use routes
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
// Setup database and store the db connection

// Authors Routes
app.get('/authors', async (req: Request, res: Response) => {
    const { name } = req.query;
    let authors = [];

    if (name) {
        // Filter authors by name
        authors = await db.all('SELECT * FROM authors WHERE name = ?', name);
    } else {
        // Fetch all authors
        authors = await db.all('SELECT * FROM authors');
    }

    res.json({ authors });
});

app.get('/authors/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Fetch author by ID from the database
        const author = await db.get('SELECT * FROM authors WHERE id = ?', id);

        if (author) {
            res.json({ author });
            res.status(201).json({ message: "Found Author" });
        } else {
            res.status(404).json({ message: `Author with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/authors', async (req: Request, res: Response) => {
    try {
        const { name, bio } = req.body;
        const authorId = uuidv4(); 
        // Save the author details to the database using the generated ID
        await db.run('INSERT INTO authors (id, name, bio) VALUES (?, ?, ?)', uuidv4(), name, bio);
        res.status(201).json({ message: "Created new author", authorId });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/authors/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Delete author by ID from the database
        await db.run('DELETE FROM authors WHERE id = ?', id);
        res.status(200).json({ message: `Deleted author with ID ${id}` });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Books Routes
app.get('/books/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Fetch book by ID from the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', id);
        
        if (book) {
            res.json({ book });
        } else {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/books', async (req: Request, res: Response) => {
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
        } else {
            res.status(404).json({ message: 'No books found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/books', async (req: Request, res: Response) => {
    const { author_id, title, pub_year, genre } = req.body;
    try {
        // Insert the new book into the database
        await db.run('INSERT INTO books (id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)', [uuidv4(), author_id, title, pub_year, genre]);
        res.status(201).json({ message: "Created new book" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/books/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Fetch book by ID from the database
        const book = await db.get('SELECT * FROM books WHERE id = ?', id);
        
        if (book) {
            res.json({ book });
        } else {
            res.status(404).json({ message: `Book with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/books', async (req: Request, res: Response) => {
    const { author_id, title, pub_year, genre } = req.body;

    try {
        // Insert the new book into the database
        await db.run('INSERT INTO books (id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)', [uuidv4(), author_id, title, pub_year, genre]);
        res.status(201).json({ message: "Created new book" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/books/:id', async (req: Request, res: Response) => {
    // Delete a book by ID
    // Implement your logic here
    res.status(200).json({ message: `Deleted book with ID ${req.params.id}` });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});