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
-- INSERT INTO authors(id, a_name, bio) VALUES ('1', 'J.K. Rowling', 'J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels. Loved by fans around the world, the series has sold over 500 million copies, been translated into 80 languages, and made into eight blockbuster films.');
