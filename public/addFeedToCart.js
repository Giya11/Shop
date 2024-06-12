const express = require('express'); 
const router = express.Router(); 
const { User, Feed, UserFeed } = require('./models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    res.status(401).sendFile(__dirname + '/Вход-или-Регистрация.html');
} 
 
router.post('/addFeedToCart', isAuthenticated, async (req, res) => { 
    try { 
        const feedId = req.body.feedId; 
        const userId = req.session.user.id; 
 
        // Проверка существования корма
        const feed = await Feed.findOne({ where: { id: feedId } }); 
        if (!feed) { 
            return res.status(404).send('Корм не найден'); 
        } 
 
        // Добавление корма в корзину пользователя 
        await UserFeed.create({ userId: userId, feedId: feedId }); 
 
        res.status(200).send('Корм успешно добавлен в корзину'); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send('Что-то пошло не так'); 
    } 
}); 
 
module.exports = router;
