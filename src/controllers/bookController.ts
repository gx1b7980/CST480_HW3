const Book = require('../models/Book');
import { Request, Response } from 'express';

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: (error as any).message });
    }
};

const createBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    

};

const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req: Request, res: Response) => {
    try {
        await Book.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
