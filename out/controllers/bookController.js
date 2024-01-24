import Book from '../models/Book.js';
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const bookList = [];
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
        const book = await Book.create(req.body);
        console.log("BOOK: " + book.lastID);
        res.status(201).json(book);
    }
    catch (error) {
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
const deleteBook = async (req, res) => {
    try {
        await Book.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { getAllBooks, getBookById, createBook, deleteBook };
