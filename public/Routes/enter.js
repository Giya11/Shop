const express = require('express');
const path = require('path');
const router = express.Router();
const ejs = require('ejs'); 

// Функция для проверки авторизации
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));
}

router.get('/', isAuthenticated, (req, res) => {
    ejs.renderFile(path.join(__dirname, '../Личный-кабинет.ejs'), { user: req.session.user }, (err, html) => {
        if (err) {
            res.status(500).send('Ошибка рендеринга EJS файла');
        } else {
            res.send(html);
        }
    });
});

module.exports = router;
