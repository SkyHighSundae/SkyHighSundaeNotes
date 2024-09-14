// app.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Configure i18n
i18n.configure({
    locales: ['en-US', 'en-UK', 'de', 'fr', 'ru'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en-US',
    cookie: 'lang',
    autoReload: true,
    syncFiles: true,
});

app.use(cookieParser());
app.use(i18n.init);

// Session middleware
app.use(session({
    secret: 'your secret key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Set the default layout

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set theme and user
app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light'; // Default to light theme
    res.locals.user = req.session.user;
    next();
});

// Middleware to set locale variable
app.use((req, res, next) => {
    res.locals.locale = req.getLocale();
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const settingsRoutes = require('./routes/settings');

app.use('/', authRoutes);
app.use('/notes', notesRoutes);
app.use('/settings', settingsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
