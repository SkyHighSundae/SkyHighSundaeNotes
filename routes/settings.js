// routes/settings.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('settings', {
        currentLang: req.getLocale(),
        currentTheme: req.cookies.theme || 'light',
        title: req.__('Settings')
    });
});

router.post('/', (req, res) => {
    const { language, theme } = req.body;
    res.cookie('lang', language, { maxAge: 900000, httpOnly: true });
    res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
    res.setLocale(language);
    res.redirect('back');
});

module.exports = router;
