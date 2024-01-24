import sqlite3 from "sqlite3";
import { open } from "sqlite";
let db = await open({
    filename: "../database.db",
    driver: sqlite3.Database,
});
class Book {
    static async getAll() {
        // Fetch all authors from the database
        const result = db.all("SELECT * FROM authors");
        return result;
    }
    static async findAll() {
        let query = `SELECT * FROM books`;
        console.log("Flag1");
        let rows = await db.all(query);
        console.log("ROWS" + rows);
        return rows;
    }
    static async findById(id) {
        // Fetch a single book by id from the database
        const row = await db.get(`SELECT * FROM books WHERE id = ?`, [id]);
        return row;
    }
    static async findByAuthorId(author_id) {
        // Fetch all books by author id from the database
        const rows = await db.all(`SELECT * FROM books WHERE author_id = ?`, [author_id]);
        return rows;
    }
    static async findByPubYear(pub_year) {
        // Fetch all books by publication year from the database
        const rows = await db.all(`SELECT * FROM books WHERE pub_year >= ?`, [pub_year]);
        return rows;
    }
    static async findByGenre(genre) {
        // Fetch all books by genre from the database
        const rows = await db.all(`SELECT * FROM books WHERE genre = ?`, [genre]);
        return rows;
    }
    static async create(data) {
        // Create a new book in the database
        const result = await db.run(`INSERT INTO books (id, author_id, title, pub_year, genre) VALUES (?, ?, ?, ?, ?)`, [data.id, data.author_id, data.title, data.pub_year, data.genre]);
        return result;
    }
    /*static async update(id:any, data:any) {
        
        const result = await db.run(`UPDATE books SET author_id = ?, title = ?, pub_year = ?, genre = ? WHERE id = ?`, [data.author_id, data.title, data.pub_year, data.genre, id]);
        return result;
    }*/
    static async delete(id) {
        // Delete a book from the database
        const result = await db.run(`DELETE FROM books WHERE id = ?`, [id]);
        return result;
    }
}
export default Book;