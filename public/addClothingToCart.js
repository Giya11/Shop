const express = require('express'); 
const router = express.Router(); 
const { User, Clothing, UserClothing } = require('./models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    res.status(401).sendFile(__dirname + '/Вход-или-Регистрация.html');
} 
 
router.post('/addClothingToCart', isAuthenticated, async (req, res) => { 
    try { 
        const clothingId = req.body.clothingId; 
        const userId = req.session.user.id; 
 
        // Проверка существования одежды
        const clothing = await Clothing.findOne({ where: { id: clothingId } }); 
        if (!clothing) { 
            return res.status(404).send('Одежда не найдена'); 
        } 
 
        // Добавление одежды в корзину пользователя 
        await UserClothing.create({ userId: userId, clothingId: clothingId }); 
 
        res.status(200).send('Одежда успешно добавлена в корзину'); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send('Что-то пошло не так'); 
    } 
}); 
 
module.exports = router;
