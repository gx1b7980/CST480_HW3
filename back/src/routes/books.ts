import express from 'express';
import { getAllBooks, getBookById, createBook, deleteBook, editBook } from '../controllers/bookController.js'; 

const router = express.Router();

// GET all books with query parameters if entered
router.get('/', getAllBooks);

// GET a single book by id
router.get('/:id', getBookById);

// POST a new book
router.post('/post', createBook);

// PUT update an existing book
router.put('/edit', editBook);

// DELETE a book
router.delete('/:id', deleteBook);

export default router;
