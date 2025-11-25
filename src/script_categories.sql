CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO categories (name) VALUES 
('AdaQuizz'),
('AdaDataviz'),
('Adaction'),
('AdaCheckEvents'),
('Projets libres');