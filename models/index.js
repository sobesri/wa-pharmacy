import sqlite3 from 'sqlite3';

// Create an SQLite database in-memory (for testing purposes)
const DB_PATH = process.env.DB_PATH || ':memory:';
const db = new sqlite3.Database(DB_PATH);

//Table creation queries with each table having auto-increment primary keys

// CREATE Medicines table
const createMedicinesTable = `
  CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER,
    deleted INTEGER DEFAULT 0
  );
`;

// CREATE Users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    deleted INTEGER DEFAULT 0,
  );
`;

// Customers are a type of non-admin users, so they have a relationship with the users table.

// CREATE Customers table
const createCustomersTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT,
    phone TEXT,
    deleted INTEGER DEFAULT 0,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`;

// Drop the previously created Tables, to clear any redundant data in the memory
// const clearTables = () => {
//   db.run('DROP TABLE IF EXISTS medicines;');
//   db.run('DROP TABLE IF EXISTS users;');
//   db.run('DROP TABLE IF EXISTS customers;');
// };

// Run the creation queries
db.serialize(() => {
  // clearTables();
  db.run(createMedicinesTable);
  db.run(createCustomersTable);
  db.run(createUsersTable);
});

db.close();

export default db;