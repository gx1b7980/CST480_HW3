import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = await open({
    filename: "../database.db",
    driver: sqlite3.Database,
});

class Author {
    
    static async findAll() {
        // Fetch all authors from the database
        const result = db.all("SELECT * FROM authors");
        return result;
    }

    static async findById(id: any) {
        // Fetch a single author by id from the database\
        let row;
        row = await db.get("SELECT * FROM authors WHERE id = ?", [id]);
        return row;
    }

    static async findByName(a_name: string) {
        let row;
        row = await db.get("SELECT * FROM authors WHERE a_name = ?", [a_name]);
        return row;
    }

    static async create(a_name: string, bio: string) {
        // Create a new author in the database
        console.log(a_name);
        console.log("Create Flag3");
        let result; 
        try{
            result = await db.run(`INSERT INTO authors(a_name, bio) VALUES(?, ?)`, [a_name, bio]);
        }catch(error){
            console.error(error);
        }
        return result;
        
    }

    static async delete(id:any) {
        // Delete an author from the database
        const result = await db.run(`DELETE FROM authors WHERE id = ?`, [id]);
        console.log(result);
        let row;
        row = await db.get("SELECT * FROM authors WHERE id = ?", [id]);
        console.log(row);
        return result;
    }
}

export default Author;
