const express = require('express'); 
const router = express.Router(); 
const { User, Accessory, UserAccessory } = require('./models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    res.status(401).sendFile(__dirname + '/Вход-или-Регистрация.html');
} 
 
router.post('/addAccessoryToCart', isAuthenticated, async (req, res) => { 
    try { 
        const accessoryId = req.body.accessoryId; 
        const userId = req.session.user.id; 
 
        // Проверка существования аксессуара
        const accessory = await Accessory.findOne({ where: { id: accessoryId } }); 
        if (!accessory) { 
            return res.status(404).send('Аксессуар не найден'); 
        } 
 
        // Добавление аксессуара в корзину пользователя 
        await UserAccessory.create({ userId: userId, accessoryId: accessoryId }); 
 
        res.status(200).send('Аксессуар успешно добавлен в корзину'); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send('Что-то пошло не так'); 
    } 
}); 
 
module.exports = router;
