import Author from '../models/Author.js';
import { Request, Response } from 'express';

const getAllAuthors = async (req: Request, res: Response) => {
    //const author = [{ id: 9, name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' },]
    //res.status(200).json(author);
    try {
        const authors = await Author.findAll();
        return res.json({ widget: authors});
        console.log(authors)
    } catch (error: any) {
        res.status(404);
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
        console.log("Fail with code 0");
        res.status(500).json({ message: "Fail with code 0" });
    }
};

const createAuthor = async (req: Request, res: Response) => {
    try {
        console.log("Flag1");
        let author = await Author.create(req.body);
        console.log("Flag2");
        console.log(author);
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
        let item = await Author.findById(req.params.id);
        console.log("Item"+item.data);
        res.status(204).json(item.data);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllAuthors, getAuthorById, createAuthor, deleteAuthor };
