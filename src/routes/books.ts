import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js'; // Ensure the paths are correct

const router = express.Router();

// GET all books
router.get('/', getAllBooks);

// GET a single book by id
router.get('/:id', getBookById);

// POST a new book
router.post('/', createBook);

// PUT update an existing book
router.put('/:id', updateBook);

// DELETE a book
router.delete('/:id', deleteBook);

export default router;
