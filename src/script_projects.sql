CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    path TEXT NOT NULL,
    promotion_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    repository_url TEXT NOT NULL,
    demo_url TEXT NOT NULL,
    creation_date DATE NOT NULL,
    publication_date DATE NOT NULL
);