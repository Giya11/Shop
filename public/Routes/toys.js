const express = require('express'); 
const router = express.Router(); 
const { Toy } = require('../models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    const path = require('path');
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));
} 
 
router.get('/', isAuthenticated, async (req, res) => { 
    const toys = await Toy.findAll();  
    let images = [  
        'images/6018025312.jpg',  
        'images/H56eb497d646e46d2a582d007ab17c419W.webp',  
        'images/6029586383.jpg',  
        'images/b25ca5a4c42b407913dec5bfa123168f.jpeg',  
        'images/6442111260.jpg',  
        'images/106931b064cc383ce7fbd7dac31d3851ff876eb8_original.jpeg',  
        'images/6ee42189ba23d8459cfd3c0579748e1c.jpeg',  
        'images/s-l1600.jpg'  
    ];  
 
    res.render('Игрушки', { toys, images });  
}); 
 
module.exports = router;