// models/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db_name = path.join(__dirname, '..', 'data', 'noteapp.db');

const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Create users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

module.exports = db;
