const db = require('../../database.db'); // Adjust the path according to your project structure

class Author {
    static async findAll() {
        // Fetch all authors from the database
        const rows = await db.all(`SELECT * FROM authors`);
        return rows;
    }

    static async findById(id: any) {
        // Fetch a single author by id from the database
        const row = await db.get(`SELECT * FROM authors WHERE id = ?`, [id]);
        return row;
    }

    static async create(data:any) {
        // Create a new author in the database
        const result = await db.run(`INSERT INTO authors (name, bio) VALUES (?, ?)`, [data.name, data.bio]);
        return result;
    }

    static async update(id:any, data:any) {
        // Update an existing author in the database
        const result = await db.run(`UPDATE authors SET name = ?, bio = ? WHERE id = ?`, [data.name, data.bio, id]);
        return result;
    }

    static async delete(id:any) {
        // Delete an author from the database
        const result = await db.run(`DELETE FROM authors WHERE id = ?`, [id]);
        return result;
    }
}

module.exports = Author;
