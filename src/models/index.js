import seedUsers from '../seeders/userSeeder.js';
import { db } from '../../db.js';

console.log('hit2');

function createTables() {
  db.serialize(() => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        quantity INTEGER,
        deleted INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        deleted INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT,
        phone TEXT,
        deleted INTEGER DEFAULT 0,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `, () => {
      db.serialize(() => {
        // db.run('DELETE FROM medicines;');
        // db.run('DELETE FROM customers;');
        // db.run('DELETE FROM users;');
        seedUsers(db);
      });
    });
  }, () => db.close());
}

createTables();