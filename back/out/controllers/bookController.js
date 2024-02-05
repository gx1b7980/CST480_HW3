import Book from '../models/Book.js';
import Author from '../models/Author.js';
const getAllBooks = async (req, res) => {
    //Still need to implement fallback where the book list is empty
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createBook = async (req, res) => {
    try {
        const author = await Author.findById(req.body.author_id);
        if (!author) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        const book = await Book.create(req.body);
        console.log("BOOK: " + book.lastID);
        res.status(201).json(book);
    }
    catch (error) {
        console.log("Fail with code 0 in create boom");
        res.status(500).json({ message: error.message });
    }
};
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        console.log("BOOK: " + book);
        if (book == undefined) {
            res.status(500).json({ message: 'Book not found' });
            return;
        }
        await Book.delete(req.params.id);
        console.log("Flag00");
        res.status(204).json("item.data");
    }
    catch (error) {
        console.log("Fail with code 0");
        res.status(500).json({ message: "Fail with code 0" });
    }
};
const editBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        console.log("BOOK: " + book);
        await Book.update(req.params.id, req.body);
        console.log("Book Updated");
        res.status(204).json("item.data");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { getAllBooks, getBookById, createBook, deleteBook, editBook };
