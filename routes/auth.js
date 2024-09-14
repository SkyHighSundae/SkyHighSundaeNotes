// routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../models/db');
const path = require('path');
const fs = require('fs');

// Redirect root path to login or notes based on authentication
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/notes');
    } else {
        res.redirect('/login');
    }
});

// GET registration page
router.get('/register', (req, res) => {
    res.render('register', { message: null, title: req.__('Register') });
});

// POST registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
        if (err) {
            console.error(err);
            res.render('register', { message: req.__('Username already exists'), title: req.__('Register') });
        } else {
            // Create user folder in notes
            const userFolder = path.join(__dirname, '..', 'notes', username);
            if (!fs.existsSync(userFolder)) {
                fs.mkdirSync(userFolder, { recursive: true });
            }
            res.redirect('/login');
        }
    });
});

// GET login page
router.get('/login', (req, res) => {
    res.render('login', { message: null, title: req.__('Login') });
});

// POST login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.render('login', { message: req.__('An error occurred'), title: req.__('Login') });
        } else if (row) {
            req.session.user = row;
            res.redirect('/notes');
        } else {
            res.render('login', { message: req.__('Invalid credentials'), title: req.__('Login') });
        }
    });
});

// GET logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
