import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as url from 'url';

let __dirname = url.fileURLToPath(new URL("..", import.meta.url));
let dbfile = `${__dirname}database.db`;

export const db = await open({
    filename: dbfile,
    driver: sqlite3.Database,
});

await db.get("PRAGMA foreign_keys = ON");

(async () => {
    
    const db = await open({
        filename: './database.db', 
        driver: sqlite3.Database
    });

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
