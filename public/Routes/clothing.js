const express = require('express'); 
const router = express.Router(); 
const { Clothing } = require('../models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    const path = require('path');
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));
} 
 
router.get('/', isAuthenticated, async (req, res) => { 
    const clothes = await Clothing.findAll();  
    let images = [  
        'images/11.jpg', 
        'images/iIrofsNTebo.jpg', 
        'images/H126ce1891a304b5b8eaaee95a7eb454ds.jpg', 
        'images/kostyumi-dlya-kotov-1.jpg', 
        'images/you-can-now-get-costumes-for-your-guinea-pig-for-halloween-0.jpg', 
        'images/ZDR61492-trxiMGQa58EGxT9Bf.jpg', 
        'images/62bfea98dbbdfeba829c75ac5e82ff84.jpeg', 
        'images/36d8ba17028e14853f62e18162c8b7ce.jpg' 
    ];  
    res.render('Одежда', { clothes, images });  
}); 
 
module.exports = router;
