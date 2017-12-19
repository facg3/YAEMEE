BEGIN;

DROP TABLE IF EXISTS CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  dob DATE,
  bio VARCHAR(500),
  type INTEGER NOT NULL
);

INSERT INTO users (username, password, type)
            VALUES ('Hanan', '123456789', 0);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id REFERENCES users(id),
  contents VARCHAR(1500)
);

INSERT INTO posts (user_id, contents)
            VALUES (1, 'ashdkjasdhkjashdjahskdjahsdkjasdkasdkasjdasd');

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id REFERENCES posts(id),
  user_id REFERENCES users(id)
);

INSERT INTO likes (post_id, user_id)
            VALUES (1, 1);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id REFERENCES posts(id),
  user_id REFERENCES users(id)
);

INSERT INTO comments (post_id, user_id)
            VALUES (1, 1);


COMMIT;
