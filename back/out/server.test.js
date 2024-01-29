import axios from "axios";
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
let a_id;
let b_id;
beforeEach(async () => {
    await db.run("DELETE FROM authors");
    await db.run("DELETE FROM books");
    a_id = (await db.run("INSERT INTO authors(a_name, bio) VALUES(?, ?)", ["John Doe", "Lorem ipsum dolor sit amet"])).lastID;
    b_id = (await db.run("INSERT INTO books(author_id, title, pub_year, genre) VALUES(?, ?, ?, ?)", [a_id, 'Book 1', "2020", "Fiction"])).lastID;
    console.log("Inserted");
});
afterEach(async () => {
    await db.run("DELETE FROM authors");
    await db.run("DELETE FROM books");
    process.stdout.write("Deleted all");
});
describe('Author Suite', () => {
    test('GET /api/authors/:id', async () => {
        /*const result = await db.get("SELECT * FROM authors WHERE id = ?", [a_id]);
        console.log(result);*/
        const response = await axios.get(`/api/authors/${a_id}`);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            id: a_id,
            a_name: 'John Doe',
            bio: 'Lorem ipsum dolor sit amet'
        });
    });
    test('GET /api/authors/:id', async () => {
        var _a, _b;
        let id = 999; // Replace with an incorrect author id
        try {
            const response = await axios.get(`/api/authors/${id}`);
            expect(response.status).toBe(404);
            console.log("Should not print: " + response.data); // Debug statement
        }
        catch (error) {
            const axiosError = error;
            console.log("Get Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(404);
        }
    });
    test('GET /api/authors/all', async () => {
        var _a, _b;
        try {
            console.log("GET ALL TEST\n\n\n");
            const response = await axios.get(`/api/authors/all/`);
            expect(response.status).toBe(200);
            //expect(response.status).toBe('success');
            console.log("Respose STATUS: " + response.status); // Debug statement
            console.log("LENGTH" + response.data.length);
            expect(response.data).toHaveLength(1);
            console.log("Length Matches");
            console.log("GET ALL TEST\n\n\n");
        }
        catch (error) {
            console.log("GET ALL ERROR\n\n\n");
            const axiosError = error;
            console.log("Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(404);
        }
    });
    test('POST /api/authors', async () => {
        const data = { a_name: "John Doe", bio: "Lorem ipsum dolor sit amet" };
        await db.run("DELETE FROM authors");
        const response = await axios.post('/api/authors/post', data);
        expect(response.status).toBe(201);
        console.log("Response: " + response); // Debug statement
        expect(response.data.lastID).toEqual(1);
    });
    test('POST /api/authors with incorrect data', async () => {
        var _a, _b, _c;
        const data = { a_name: 'John Doe', bio: 'Lorem ipsum dolor sit amet' };
        await db.run("DELETE FROM authors");
        try {
            const response = await axios.post('/api/authors', data);
            expect(response.status).toBe(400);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        }
        catch (error) {
            const axiosError = error;
            console.log("Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            if ((((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status) == 500) || (((_c = axiosError.response) === null || _c === void 0 ? void 0 : _c.status) == 500)) {
                expect(true);
            }
            else {
                expect(false);
            }
        }
    });
    test('DELETE /api/authors/:id', async () => {
        let id = 1; // Replace with the desired author id
        const response = await axios.delete(`/api/authors/${id}`);
        expect(response.status).toBe(204);
        expect(response.data).toEqual("");
    });
    test('DELETE /api/authors/:id with incorrect data', async () => {
        var _a, _b;
        let id = 999; // Replace with an incorrect author id
        try {
            const response = await axios.delete(`/api/authors/${id}`);
            expect(response.status).toBe(404);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        }
        catch (error) {
            const axiosError = error;
            console.log("Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(500);
        }
    });
});
describe('Book Suite', () => {
    test('GET /api/books/:id', async () => {
        console.log("BOOK TESTS START");
        const result = await db.get("SELECT * FROM books WHERE id = ?", [b_id]);
        console.log("GET 1 RESPONSE: " + result);
        const response = await axios.get(`/api/books/${b_id}`);
        expect(response.status).toBe(200);
        console.log("GET GET Response: " + response.status); // Debug statement
        expect(response.data).toEqual({
            id: b_id,
            author_id: a_id,
            title: 'Book 1',
            pub_year: '2020',
            genre: 'Fiction'
        });
    });
    test('GET /api/books/:id with incorrect id', async () => {
        var _a, _b;
        try {
            let id = 999;
            const response = await axios.get(`/api/books/${id}`);
            console.log("GET 3 Response: " + response.status); // Debug statement
            expect(response.status).toBe(404);
            console.log(response.data);
            expect(response.data).toEqual("SHOUD NOT PRINT");
        }
        catch (error) {
            const axiosError = error;
            console.log("GET Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(404);
        }
    });
    test('GET /api/books/all', async () => {
        var _a, _b;
        try {
            const response = await axios.get(`/api/books/`);
            console.log("GET 2Response: " + response.status); // Debug statement
            expect(response.status).toBe(200);
            console.log(response.data);
            expect(response.data).toHaveLength(1);
            console.log("GET Length Matches");
        }
        catch (error) {
            const axiosError = error;
            console.log("GET Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(404);
        }
    });
    test('POST /api/books', async () => {
        await db.run("DELETE FROM books");
        const data = {
            author_id: a_id,
            title: 'Book 2',
            pub_year: '2022',
            genre: 'Mystery'
        };
        console.log("POST TEST\n\n\n");
        const response = await axios.post('/api/books/post', data);
        expect(response.status).toBe(201);
        console.log("POST RESPONSE: " + response.status);
        expect(response.data.lastID).toEqual(1);
    });
    test('POST /api/books with incorrect author id', async () => {
        var _a, _b, _c;
        const data = { id: 5, author_id: 999, title: 'Book 1', pub_year: '2020', genre: 'Fiction' };
        try {
            const response = await axios.post('/api/books/post', data);
            expect(response.status).toBe(400);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        }
        catch (error) {
            const axiosError = error;
            console.log("Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            if ((((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status) == 500) || (((_c = axiosError.response) === null || _c === void 0 ? void 0 : _c.status) == 500)) {
                expect(true);
            }
            else {
                expect(false);
            }
        }
    });
    test('DELETE /api/books/:id', async () => {
        const response = await axios.delete(`/api/books/${b_id}`);
        expect(response.status).toBe(204);
    });
    test('DELETE /api/books/:id with incorrect data', async () => {
        var _a, _b;
        let id = 999;
        try {
            console.log("DELETE TEST\n\n\n");
            const response = await axios.delete(`/api/books/${id}`);
            console.log("RESPONSE:" + response.status);
            expect(response.status).toBe(404);
            console.log("SHOULD NOT PRINT: " + response.data); // Debug statement
        }
        catch (error) {
            const axiosError = error;
            console.log("Error: " + ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data)); // Debug statement
            expect((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status).toBe(500);
        }
    });
});
