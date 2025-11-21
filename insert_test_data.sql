-- Insert required default user "gold" with password "smiths"

INSERT INTO users (username, first_name, last_name, email, hashed_password)
VALUES 
('gold', 'Mark', 'Gold', 'marker@doc', '$2b$10$WC8u.itPn/IhbnUDkonUyed2Nga.LeAWGz/0bmFb.HSQzoSXtzkqy');

-- Insert sample books (optional but fine)
INSERT INTO books (name, price)
VALUES
('Database Book', 40.25),
('Node.js Book', 25.00),
('Express Book', 31.99);
