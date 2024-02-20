import { db } from '../../db.js';
import seedUsers from '../seeders/userSeeder.js';
import seedMedicines from '../seeders/medicineSeeder.js';
import seedCustomers from '../seeders/customerSeeder.js';

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
      CREATE TABLE IF NOT EXISTS systemUsers (
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
        FOREIGN KEY (user_id) REFERENCES systemUsers (id)
      );
    `, () => {
      db.serialize(() => {
        // db.run('DELETE FROM medicines;');
        // db.run('DELETE FROM customers;');
        // db.run('DELETE FROM systemUsers;');
        seedUsers(db);
        seedCustomers(db);
        seedMedicines(db);
      });
    });
  }, () => db.close());
}

createTables();