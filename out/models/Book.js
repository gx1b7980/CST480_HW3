import { db } from '../server.js';
class Book {
    static async findAll(filter) {
        let query = `SELECT * FROM books`;
        if (filter) {
            const { id, pub_year, author_id } = filter;
            const conditions = [];
            if (id) {
                conditions.push(`id = ${id}`);
            }
            if (pub_year) {
                conditions.push(`pub_year = ${pub_year}`);
            }
            if (author_id) {
                conditions.push(`author_id = ${author_id}`);
            }
            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }
        }
        const rows = await db.all(query);
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
