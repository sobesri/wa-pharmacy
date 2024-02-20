import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

// Create an SQLite database in-memory (for testing purposes)
const DB_PATH = process.env.DB_PATH || ':memory:';

const getDBConnection = async () => {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
  return db;
}

const db = await getDBConnection().then((newDb) => newDb.getDatabaseInstance());

export { db };