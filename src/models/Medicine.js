import { db } from "../../db.js";
import BaseModel from "./BaseModel.js";

class Medicine extends BaseModel {
  constructor(name, description, quantity) {
    super();
    this.name = name;
    this.description = description;
    this.quantity = quantity;
  }

  static insert({ name, description, quantity }) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO medicines (name, description, quantity) VALUES (?, ?, ?)';
      const values = [name, description, quantity];

      db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static update(id, { name, description, quantity }) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE medicines SET name=?, description=?, quantity=? WHERE id=?';
      const values = [name, description, quantity, id];

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
      let query = 'UPDATE medicines SET deleted = 1 WHERE id = ?';
      if (!softDelete) {
        query = 'DELETE FROM medicines WHERE id = ?';
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
      let query = 'SELECT * FROM medicines';
      let values = [];
      if (searchTerm) {
        query += ' WHERE name LIKE ? OR description LIKE ?';
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
      const query = 'SELECT * FROM medicines WHERE id = ?';

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

export default Medicine;