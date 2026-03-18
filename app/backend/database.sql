CREATE TABLE seances (
 id SERIAL PRIMARY KEY,
 date DATE,
 heure TIME,
 places_max INT DEFAULT 2
);

CREATE TABLE reservations (
 id SERIAL PRIMARY KEY,
 parent_nom TEXT,
 email TEXT,
 telephone TEXT,
 enfant_nom TEXT,
 seance_id INT
);
