import sqlite3 from 'sqlite3';

const DB_PATH = process.env.DB_PATH || ':memory:';
const db = new sqlite3.Database(DB_PATH);

const createMedicinesTable = `
  CREATE TABLE IF NOT EXISTS medicines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER,
    is_deleted INTEGER DEFAULT 0
  );
`;

const createCustomersTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    is_deleted INTEGER DEFAULT 0
  );
`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );
`;

db.serialize(() => {
  db.run(createMedicinesTable);
  db.run(createCustomersTable);
  db.run(createUsersTable);
});

db.close();

export default db;