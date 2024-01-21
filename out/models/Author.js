import db from '../server.js';
class Author {
    static async findAll() {
        // Fetch all authors from the database
        const rows = await db.all(`SELECT * FROM authors`);
        return rows;
    }
    static async findById(id) {
        // Fetch a single author by id from the database
        const row = await db.get(`SELECT * FROM authors WHERE id = ?`, [id]);
        return row;
    }
    static async create(data) {
        // Create a new author in the database
        const result = await db.post(`INSERT INTO authors (name, bio) VALUES (?, ?)`, [data.name, data.bio]);
        return result;
    }
    static async delete(id) {
        // Delete an author from the database
        const result = await db.delete(`DELETE FROM authors WHERE id = ?`, [id]);
        return result;
    }
}
export default Author;
