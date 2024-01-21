// server.test.ts
import request from 'supertest';
import app from './server.js'; // Import the instance of your express app
// Tests for Authors Routes
describe('Authors Routes', () => {
    it('GET /authors should return all authors', async () => {
        const response = await request(app).get('/authors');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('authors');
    });
    it('GET /authors/:id should return a specific author', async () => {
        const response = await request(app).get('/authors/1'); // assuming 1 is a valid author ID
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('author');
    });
    it('POST /authors should create a new author', async () => {
        const response = await request(app)
            .post('/authors')
            .send({ name: 'New Author', bio: 'Bio of new author' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Created new author');
    });
    it('DELETE /authors/:id should delete a specific author', async () => {
        const response = await request(app).delete('/authors/1'); // assuming 1 is a valid author ID
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', `Deleted author with ID 1`);
    });
});
// Tests for Books Routes
describe('Books Routes', () => {
    it('GET /books should return all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('books');
    });
    it('GET /books/:id should return a specific book', async () => {
        const response = await request(app).get('/books/1'); // assuming 1 is a valid book ID
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('book');
    });
    it('POST /books should create a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({ author_id: '1', title: 'New Book', pub_year: '2023', genre: 'Fiction' }); // assuming 1 is a valid author ID
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Created new book');
    });
    it('DELETE /books/:id should delete a specific book', async () => {
        const response = await request(app).delete('/books/1'); // assuming 1 is a valid book ID
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', `Deleted book with ID 1`);
    });
});
