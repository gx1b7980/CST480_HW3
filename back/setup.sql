CREATE TABLE authors (
    id integer PRIMARY KEY, -- can change to be integer if you want
    a_name TEXT,
    bio TEXT
);
CREATE TABLE books (
    id integer PRIMARY KEY, -- can change to be integer if you want
    author_id integer,
    title TEXT,
    pub_year TEXT,
    genre TEXT,
    FOREIGN KEY(author_id) REFERENCES authors(id)
);

-- dummy data 
INSERT INTO authors(a_name, bio) VALUES ('J.K. Rowling', 'J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels. Loved by fans around the world, the series has sold over 500 million copies, been translated into 80 languages, and made into eight blockbuster films.');
INSERT INTO authors(a_name, bio) VALUES ('J.R.R. Tolkien', 'John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.');
INSERT INTO authors(a_name, bio) VALUES ('George R.R. Martin', 'George Raymond Richard Martin, also known as GRRM, is an American novelist and short story writer, screenwriter, and television producer. He is the author of the series of epic fantasy novels A Song of Ice and Fire, which was adapted into the Emmy Award-winning HBO series Game of Thrones.');
INSERT INTO authors(a_name, bio) VALUES ('JOSEPH. Tolkien', 'John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.');
INSERT INTO books(author_id, title, pub_year, genre) VALUES ('1', 'Harry Potter and the Philosopher''s Stone', '1997', 'Fantasy');
INSERT INTO books(author_id, title, pub_year, genre) VALUES ('1', 'Harry Potter and the Chamber of Secrets', '1998', 'Fantasy');
INSERT INTO books(author_id, title, pub_year, genre) VALUES ('2', ' A Song of Ice and Fire', '1999', 'Adventure');
INSERT INTO books(author_id, title, pub_year, genre) VALUES ('3', 'Harry Potter and the Goblet of Fire', '2000', 'Fantasy');
INSERT INTO books(author_id, title, pub_year, genre) VALUES ('4', 'The Hobbit and The Lord of the Rings.', '2003', 'Thriller');