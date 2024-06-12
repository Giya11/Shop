const express = require('express');  
const path = require('path');  
const router = express.Router();  
const ejs = require('ejs');   
const { User, Toy, Clothing, Feed, Accessory } = require('../models');  
  
// Функция для проверки авторизации  
function isAuthenticated(req, res, next) {  
    if (req.session && req.session.user) {  
        return next();  
    }  
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));  
}  
  
router.get('/', isAuthenticated, async (req, res) => {  
    const user = await User.findOne({ where: { username: req.session.user.username } });  
    const toys = await user.getToys();  
    const clothes = await user.getClothings();  
    const feeds = await user.getFeeds();  
    const accessories = await user.getAccessories();  
  
    ejs.renderFile(path.join(__dirname, '../Корзина.ejs'), { user: req.session.user, toys: toys, clothes: clothes, feeds: feeds, accessories: accessories }, (err, html) => {  
        if (err) {  
            res.status(500).send('Ошибка рендеринга EJS файла');  
        } else {  
            res.send(html);  
        }  
    });  
});  
  
module.exports = router;
