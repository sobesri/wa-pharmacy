import { db } from "../../db.js";
import User from "./User.js";

class Customer extends User {
  constructor(address, phone) {
    this.address = address;
    this.phone = phone;
  }

  static insert({ address, phone }) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO customers (address, phone) VALUES (?, ?)';
      const values = [address, phone];

      db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static update(id, { address, phone }) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE customers SET address=?, phone=? WHERE id=?';
      const values = [address, phone, id];

      db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ rowsAffected: this.changes });
        }
      });
    });
  }

  static delete(id, softDelete = true) {
    return new Promise((resolve, reject) => {
      let query = 'UPDATE customers SET deleted = 1 WHERE id = ?';
      if (!softDelete) {
        query = 'DELETE FROM customers WHERE id = ?';
      }

      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ rowsAffected: this.changes });
        }
      });
    });
  }

  static getAll({ searchTerm = null, limit = 10, offset = 0 }) {
    return new Promise((resolve, reject) => {
      // Join Users table with Customers table when searching for customer information.
      // TODO: check query
      let query = 'SELECT c.*, u.name AS name, u.role AS role FROM customers as c INNER JOIN systemUsers as u ON c.user_id = u.id';
      let values = [];
      if (searchTerm) {
        query += ' WHERE name LIKE ? OR address LIKE ?';
        values.push(...[`%${searchTerm}%`, `%${searchTerm}%`]);
      }
      query += ' LIMIT ? OFFSET ?';
      values.push(...[limit, offset]);

      db.serialize(() => {
        db.all(query, values, (err, runResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(runResult);
          }
        });
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT c.*, u.name AS name, u.role AS role FROM customers as c INNER JOIN systemUsers as u ON c.user_id = u.id WHERE id = ?';

      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default Customer;