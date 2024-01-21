const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

(async () => {
    // Open the database
    const db = await open({
        filename: './database.db', // Adjust the path as needed
        driver: sqlite3.Database
    });

    // Create tables if they don't exist (You might need to adjust the schema)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS authors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            bio TEXT
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author_id INTEGER,
            title TEXT,
            pub_year TEXT,
            genre TEXT,
            FOREIGN KEY (author_id) REFERENCES authors(id)
        )
    `);

    module.exports = db;
})();
