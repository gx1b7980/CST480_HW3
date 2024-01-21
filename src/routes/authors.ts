import express from 'express';
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController.js'; // Ensure the paths are correct

const router = express.Router();

// GET all authors
router.get('/', getAllAuthors);

// GET a single author by id
router.get('/:id', getAuthorById);

// POST a new author
router.post('/', createAuthor);

// PUT update an existing author
router.put('/:id', updateAuthor);

// DELETE an author
router.delete('/:id', deleteAuthor);

export default router;
