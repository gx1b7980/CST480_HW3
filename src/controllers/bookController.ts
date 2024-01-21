import Book from '../models/Book.js';
import { Request, Response } from 'express';

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const { id, pub_year, author_id } = req.query;
        let books:any = {};

        if (id) {
            books = await Book.findById(id);
        }

        if (pub_year) {
            books = await Book.findByPubYear(id);
        }

        if (author_id) {
            books = await Book.findByAuthorId(id);
        }

        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
const bookList: Book[] = [];

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

/*const updateBook = async (req: Request, res: Response) => {
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
};*/

const deleteBook = async (req: Request, res: Response) => {
    try {
        await Book.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllBooks, getBookById, createBook, deleteBook };
