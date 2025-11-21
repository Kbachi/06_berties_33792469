-- ---------------------------------------
-- Create tables for Bertie's Books (Lab 7)
-- ---------------------------------------

-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    price DECIMAL(5,2)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    hashed_password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit table 
CREATE TABLE IF NOT EXISTS login_audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    success BOOLEAN,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
