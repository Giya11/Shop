const express = require('express'); 
const router = express.Router(); 
const { User, Toy, UserToy } = require('./models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    res.status(401).sendFile(__dirname + '/Вход-или-Регистрация.html');
} 
 
router.post('/addToyToCart', isAuthenticated, async (req, res) => { 
    try { 
        const toyId = req.body.toyId; 
        const userId = req.session.user.id; 
 
        // Проверка существования игрушки 
        const toy = await Toy.findOne({ where: { id: toyId } }); 
        if (!toy) { 
            return res.status(404).send('Игрушка не найдена'); 
        } 
 
        // Добавление игрушки в корзину пользователя 
        await UserToy.create({ userId: userId, toyId: toyId }); 
 
        res.status(200).send('Игрушка успешно добавлена в корзину'); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send('Что-то пошло не так'); 
    } 
}); 
 
module.exports = router;
