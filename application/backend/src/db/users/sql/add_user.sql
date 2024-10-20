INSERT INTO users (username, password, email) 
VALUES (${username}, ${password}, ${email}) 
RETURNING id, username, email