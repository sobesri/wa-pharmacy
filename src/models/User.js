import { db } from "../../db.js";
import BaseModel from "./BaseModel.js";

class User extends BaseModel {
  constructor(name, username, password, role) {
    super();
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  static insert({ name, username, password, role }) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)';
      const values = [name, username, password, role];

      db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static update(id, { name }) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE users SET name=? WHERE id=?';
      const values = [name, id];

      db.run(query, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ rowsAffected: this.changes });
        }
      });
    });
  }

  // User specific function to update the role
  static updateRole(id, role) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE users SET role=? WHERE id=?';
      const values = [role.toLower(), id];

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
      let query = 'UPDATE users SET deleted = 1 WHERE id = ?';
      if (!softDelete) {
        query = 'DELETE FROM users WHERE id = ?';
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

  static getAll({ searchTerm = null, limit = 25, offset = 0 }) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM users';
      let values = [];
      if (searchTerm) {
        query += ' WHERE name LIKE ? OR username LIKE ? OR role LIKE ?';
        values.push(...[`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
      }
      query += ' LIMIT ?,?';
      values.push(...[limit, offset]);

      db.serialize(() => {
        db.all(query, values, (err, runResult) => {
          if (err) {
            console.log("error", error);
            reject(err);
          } else {
            console.log("results", runResult, query);
            resolve(runResult);
          }
        });
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';

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

export default User;