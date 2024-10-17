-- Up Migration

-- Insert mock data to test
INSERT INTO "users" (username, email, password) VALUES
('user1', 'user1@example.com', 'hashedpassword1'),
('user2', 'user2@example.com', 'hashedpassword2'),
('user3', 'user3@example.com', 'hashedpassword3');


-- Down Migration