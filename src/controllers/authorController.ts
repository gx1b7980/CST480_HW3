import Author from '../models/Author.js';
import { Request, Response } from 'express';

const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getAuthorById = async (req: Request, res: Response) => {
    try {
        const author = await Author.findById(req.params.id);
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const createAuthor = async (req: Request, res: Response) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
/*
const updateAuthor = async (req: Request, res: Response) => {
    try {
        const author = await Author.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json(author);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};*/

const deleteAuthor = async (req: Request, res: Response) => {
    try {
        await Author.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllAuthors, getAuthorById, createAuthor, deleteAuthor };
