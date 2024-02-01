import sqlite3 from "sqlite3";
import { open } from "sqlite";
let db = await open({
    filename: "../database.db",
    driver: sqlite3.Database,
});

class Book {

    static async getAll() {
        const result = db.all("SELECT * FROM authors");
        return result;
    }

    static async findAll() {
        let query = `SELECT * FROM books`;
        console.log("Flag1");
        let rows = await db.all(query);
        console.log("ROWS"+rows);  
        return rows;
    }

    static async findById(id:any) {
        // Fetch a single book by id from the database
        const row = await db.get(`SELECT * FROM books WHERE id = ?`, [id]);
        return row;
    }

    //To implement the following functions later
    /*
    static async findByAuthorId(author_id:any) {
        // Fetch all books by author id from the database
        const rows = await db.all(`SELECT * FROM books WHERE author_id = ?`, [author_id]);
        return rows;
    }

    static async findByPubYear(pub_year:any) {
        // Fetch all books by publication year from the database
        const rows = await db.all(`SELECT * FROM books WHERE pub_year >= ?`, [pub_year]);
        return rows;
    }

    static async findByGenre(genre:any) {
        // Fetch all books by genre from the database
        const rows = await db.all(`SELECT * FROM books WHERE genre = ?`, [genre]);
        return rows;
    }
*/

    static async update(id:any, data:any) {
        const result = await db.run(`UPDATE books SET author_id = ?, title = ?, pub_year = ?, genre = ? WHERE id = ?`, [data.author_id, data.title, data.pub_year, data.genre, id]);
        return result;
    }

    

    static async create(data:any) {
        // Create a new book in the database
        const result = await db.run(`INSERT INTO books (author_id, title, pub_year, genre) VALUES (?, ?, ?, ?)`, [data.author_id, data.title, data.pub_year, data.genre]);
        return result;
    }

    static async delete(id:any) {  
        const row = await db.get(`SELECT * FROM books WHERE id = ?`, [id]);
        console.log(row);
        const result = await db.run(`DELETE FROM books WHERE id = ?`, [id]);
        return result;
    }
}

export default Book;
