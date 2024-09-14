// routes/notes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// GET notes page
router.get('/', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const userFolder = path.join(__dirname, '..', 'notes', username);
    fs.readdir(userFolder, (err, files) => {
        if (err) {
            console.error(err);
            res.send(req.__('Could not load notes'));
        } else {
            res.render('notes', { notes: files, title: req.__('Notes') });
        }
    });
});

// GET new note page
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new_note', { title: req.__('New Note') });
});

// POST new note
router.post('/new', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const { title, content } = req.body;
    const userFolder = path.join(__dirname, '..', 'notes', username);
    const notePath = path.join(userFolder, title + '.txt');
    fs.writeFile(notePath, content, (err) => {
        if (err) {
            console.error(err);
            res.send(req.__('Could not save note'));
        } else {
            res.redirect('/notes');
        }
    });
});

// GET view note
router.get('/view/:title', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const title = req.params.title;
    const userFolder = path.join(__dirname, '..', 'notes', username);
    const notePath = path.join(userFolder, title);
    fs.readFile(notePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.send(req.__('Could not read note'));
        } else {
            res.render('view_note', { title: title.replace('.txt', ''), content: data });
        }
    });
});

module.exports = router;
