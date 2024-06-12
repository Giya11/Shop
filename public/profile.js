// profile.js
const express = require('express');
const router = express.Router();

// Функция для проверки авторизации
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).sendFile(__dirname + '/Вход-или-Регистрация.html');
}

// Использование функции isAuthenticated в маршруте
router.get('/profile', isAuthenticated, (req, res) => { 
   res.render('Личный-кабинет', { user: req.session.user });
});

module.exports = router;