import { cp } from 'fs';
import Author from '../models/Author.js';
import { Request, Response } from 'express';

const getAllAuthors = async (req: Request, res: Response) => {
    //const author = [{ id: 9, name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' },]
    //res.status(200).json(author);
    try {
        const authors = await Author.findAll();
        console.log("MMMM YUM LENGTH"+authors.length);
        console.log(authors)
        return res.status(200).json(authors);
    } catch (error: any) {
        return res.status(404);
    }
};

const getAuthorByName = async (req: Request, res: Response) => {
    console.log("ENTERS LOOKUP:"+req.params.name);
    try{
        console.log("Flag 1");
        const author = await Author.findByName(req.params.name);
        console.log("LOOKING FOR: "+req.params.name);
        if (author) {
            const a_id = author.id
            res.status(200).json(a_id);
            console.log("Flag VAO"+a_id);
        } else {
            console.log("404");
            res.status(404).json({ message: 'Author not found' });
        }
    }catch(error:any){
        console.log("Unknown error");
        res.status(900).json({message: "Unknown error"})
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
        console.log("Flag0");
        console.log("Flag1: "+req.body.name+" "+req.body.bio);
        let author = await Author.create(req.body.name, req.body.bio);
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

export { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, getAuthorByName };
