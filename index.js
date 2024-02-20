import './server.mjs';
import db from './models/index.js';

db.serialize(() => {
  db.each("SELECT id, info FROM users", (err, row) => {
    console.log(row);
  });
});

db.close();