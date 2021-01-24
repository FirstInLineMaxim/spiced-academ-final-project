DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL CHECK (first_name != ''),
    last_name VARCHAR(255) NOT NULL CHECK (last_name != ''),
    email VARCHAR(250) NOT NULL UNIQUE CHECK (email != ''),
    password  VARCHAR(250) NOT NULL CHECK (password != ''),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN profile_pic VARCHAR;

ALTER TABLE users ADD COLUMN bio VARCHAR;

ALTER TABLE users ADD COLUMN hair_type VARCHAR;

ALTER TABLE users ADD COLUMN hair_health VARCHAR;

-- ALTER TABLE users TYPE COLUMN hair_health INT REFERENCES survey_results(id);