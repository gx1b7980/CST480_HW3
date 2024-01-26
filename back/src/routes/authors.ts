import express from 'express';
import { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, getAuthorByName } from '../controllers/authorController.js'; 

const router = express.Router();

// GET all authors
router.get('/all', getAllAuthors);

// GET a single author by id
router.get('/:id', getAuthorById);

//GET a single author by name
router.get('/name/:name', getAuthorByName)

// POST a new author
router.post('/post', createAuthor);

// PUT update an existing author
//router.put('/:id', updateAuthor);

// DELETE an author
router.delete('/:id', deleteAuthor);

export default router;
