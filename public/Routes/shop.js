const express = require('express'); 
const path = require('path'); 
const router = express.Router(); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));
} 
 
router.get('/', isAuthenticated, (req, res) => { 
    res.sendFile(path.join(__dirname, '../Товары.html'));
}); 
 
module.exports = router;