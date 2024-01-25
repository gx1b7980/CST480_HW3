import axios, { AxiosError } from "axios";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose(); // enable better error messages
let db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
});

let port = 3000;
let host = "localhost";
let protocol = "http";
let baseURL = `${protocol}://${host}:${port}`;

axios.defaults.baseURL = baseURL;


let A1 = 1
let A2 = 2
let A3 = 3

let authors = [
    { id: 1, a_name: "John Doe", bio: "Lorem ipsum dolor sit amet" },
    { id: A2, name: 'Jane Smith', bio: 'Consectetur adipiscing elit' },
    //{ id: A2, name: 'Alice Johnson', bio: 'Sed do eiusmod tempor incididunt' },
];
const books = [

    { id: 5, author_id: A1, title: 'Book 1', pub_year: '2020', genre: 'Fiction' },
];
beforeEach(async () => {
    for (let { id, a_name, bio} of authors) {
        await db.run(
            "INSERT INTO authors(id, a_name, bio) VALUES(?, ?, ?)",
            [id, a_name, bio]
        );
        
    } 
    for (let { id, author_id, title, pub_year, genre} of books) {
        
            await db.run(
                "INSERT INTO books(id, author_id, title, pub_year, genre) VALUES(?, ?, ?, ?, ?)",
                [id, author_id, title, pub_year, genre]
                
            );
    }
    } 
);

afterEach(async () => {
    await db.run("DELETE FROM authors");
    await db.run("DELETE FROM books");
    process.stdout.write("Deleted all");
});

describe('Author Suite', () => {
    test('GET /api/authors/:id', async() => {
            let id = 1; // Replace with the desired author id
            const result = await db.get("SELECT * FROM authors WHERE id = ?", [id]);
            console.log(result);
            const response = await axios.get(`/api/authors/${id}`);
            expect(response.status).toBe(200);
            expect(response.data).toEqual({
                id: A1,
                a_name: 'John Doe',
                bio: 'Lorem ipsum dolor sit amet'
            });
        });

    test('GET /api/authors/:id', async () => {
            let id = 999; // Replace with an incorrect author id
            try {
                const response = await axios.get(`/api/authors/${id}`);
                expect(response.status).toBe(404);
                console.log("Should not print: " + response.data); // Debug statement
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log("Get Error: " + axiosError.response?.data); // Debug statement
                expect(axiosError.response?.status).toBe(404);
            }
        });

    test('GET /api/authors/all', async() => {
            try {
                const response = await axios.get(`/api/authors/all/`);
                expect(response.status).toBe(200);
                //expect(response.status).toBe('success');
                console.log("Respose: " + response.status); // Debug statement

                expect(response.data.widget).toHaveLength(2);
                console.log("Length Matches");
                
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log("Error: " + axiosError.response?.data); // Debug statement
                expect(axiosError.response?.status).toBe(404);
            }
        });
    
    test('POST /api/authors', async() => {
            const data = {id: 4, a_name: "John Doe",bio: "Lorem ipsum dolor sit amet"};
            const response = await axios.post('/api/authors/post', data);
            expect(response.status).toBe(201);
            console.log("Response: " + response); // Debug statement
            expect(response.data.lastID).toEqual(4);
        }
    );
    test('POST /api/authors with incorrect data', async () => {
            const data = { id: 1, a_name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' };
            try {
                const response = await axios.post('/api/authors', data);
                expect(response.status).toBe(400);
                console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log("Error: " + axiosError.response?.data); // Debug statement
                if((axiosError.response?.status == 500) || (axiosError.response?.status == 500) ){
                    expect(true);
                }else{
                    expect(false);}
            }
        }
    );
    test('DELETE /api/authors/:id', async() => {
            let id = 1; // Replace with the desired author id
            const response = await axios.delete(`/api/authors/${id}`);
            expect(response.status).toBe(204);
            expect(response.data).toEqual("");
        }
    );
    test('DELETE /api/authors/:id with incorrect data', async () => {
            let id = 999; // Replace with an incorrect author id
            try {
                const response = await axios.delete(`/api/authors/${id}`);
                expect(response.status).toBe(404);
                console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
            } catch (error) {
                const axiosError = error as AxiosError;
                console.log("Error: " + axiosError.response?.data); // Debug statement
                expect(axiosError.response?.status).toBe(500);
            }
        });
});
describe('Book Suite', () => {
    test('GET /api/books/:id', async() => {
        console.log("BOOK TESTS START");
        let id = 5; 
        const result = await db.get("SELECT * FROM books WHERE id = ?", [id]);
        console.log("GET 1 RESPONSE: "+result);
        const response = await axios.get(`/api/books/${id}`);
        expect(response.status).toBe(200);
        console.log("GET GET Response: " + response.status); // Debug statement
        expect(response.data).toEqual({
            id: 5,
            author_id: 1,
            title: 'Book 1',
            pub_year: '2020',
            genre: 'Fiction'
        });
    });

    test('GET /api/books/:id with incorrect id', async() => {
        try {
            let id = 999;
            const response = await axios.get(`/api/books/${id}`);
            console.log("GET 3 Response: " + response.status); // Debug statement
            expect(response.status).toBe(404);
            console.log(response.data);
            expect(response.data).toEqual("SHOUD NOT PRINT");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("GET Error: " + axiosError.response?.data); // Debug statement
            expect(axiosError.response?.status).toBe(404);
        }
    });

    test('GET /api/books/all', async() => {
        try {
            const response = await axios.get(`/api/books/`);
            console.log("GET 2Response: " + response.status); // Debug statement
            expect(response.status).toBe(200);
            console.log(response.data)
            expect(response.data).toHaveLength(1);
            console.log("GET Length Matches");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("GET Error: " + axiosError.response?.data); // Debug statement
            expect(axiosError.response?.status).toBe(404);
        }
    });
    
    test('POST /api/books', async() => {
        const data = {
            id: 6,
            author_id: 2,
            title: 'Book 2',
            pub_year: '2022',
            genre: 'Mystery'
        };
        console.log("POST TEST\n\n\n");
        const response = await axios.post('/api/books/post', data);
        expect(response.status).toBe(201);
        console.log("POST RESPONSE: "+ response.status);
        expect(response.data.lastID).toEqual(6);
    });

    test('POST /api/books with incorrect author id', async () => {
        const data = { id: 5, author_id: 999, title: 'Book 1', pub_year: '2020', genre: 'Fiction' };
        try {
            const response = await axios.post('/api/books/post', data);
            expect(response.status).toBe(400);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("Error: " + axiosError.response?.data); // Debug statement
            if((axiosError.response?.status == 500) || (axiosError.response?.status == 500) ){
                expect(true);
            }else{
                expect(false);}
        }
    });

    test('DELETE /api/books/:id', async() => {
        let id = 5; 
        const response = await axios.delete(`/api/books/${id}`);
        expect(response.status).toBe(204);
    });

    test('DELETE /api/books/:id with incorrect data', async () => {
        let id = 999; 
        try {
            console.log("DELETE TEST\n\n\n");
            const response = await axios.delete(`/api/books/${id}`);
            console.log("RESPONSE:"+response.status);
            expect(response.status).toBe(404);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("Error: " + axiosError.response?.data); // Debug statement
            expect(axiosError.response?.status).toBe(500);
        }
    });
});