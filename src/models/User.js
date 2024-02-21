import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    return new Promise(async (resolve, reject) => {
      const query =
        'INSERT INTO systemUsers (name, username, password, role) VALUES (?, ?, ?, ?)';

      if (!password) {
        reject("Password has not been sent");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!hashedPassword) {
        reject("Hashed password could not be generated");
      }

      const values = [name, username, hashedPassword, role];

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
        'UPDATE systemUsers SET name=? WHERE id=?';
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
        'UPDATE systemUsers SET role=? WHERE id=?';
      const values = [role.toLowerCase(), id];

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
      let query = 'UPDATE systemUsers SET deleted = 1 WHERE id = ?';
      if (!softDelete) {
        query = 'DELETE FROM systemUsers WHERE id = ?';
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
      let query = 'SELECT * FROM systemUsers';
      let values = [];
      if (searchTerm) {
        query += ' WHERE name LIKE ? OR username LIKE ? OR role LIKE ?';
        values.push(...[`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
      }
      query += ' LIMIT ? OFFSET ?';
      values.push(...[limit, offset * limit]);

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
      const query = 'SELECT * FROM systemUsers WHERE id = ?';

      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static authenticate({ username, password }) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM systemUsers WHERE username = ?';

      db.get(query, [username], (err, user) => {
        if (err) {
          reject(err);
        } else {
          if (user && user.username && user.password) {
            if (bcrypt.compareSync(password, user.password)) {
              const token = jwt.sign({
                userId: user.id,
                username: user.username,
                role: user.role
              }, process.env.JWT_SECRET, { expiresIn: '1h' });

              resolve({ token });
            } else {
              resolve({ error: "Un-authorized", code: 401 });
            }
            resolve({ error: "User not found", code: 404 });
          }
        }
        reject("Internal server error");
      });
    });
  }
}

export default User;