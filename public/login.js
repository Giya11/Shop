const express = require('express');
const session = require('express-session');
const router = express.Router();
const {
    User
} = require('./models');

router.post('/login', async (req, res) => {
    console.log(req.body);

    try { // Проверка существования пользователя
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(401).send('Неверный email или пароль');
        }
        // Проверка пароля        
        if (req.body.password !== user.password) {
            return res.status(401).send('Неверный email или пароль');
        }
        req.session.user = user;
        res.status(200).send('Успешная авторизация');
    } catch (error) {
        console.error(error);
        res.status(500).send('Что-то пошло не так');
    }
});
// Функция для проверки авторизации
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).send('Вы должны войти в систему');
}
module.exports = router;