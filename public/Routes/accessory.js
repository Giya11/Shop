const express = require('express'); 
const router = express.Router(); 
const { Accessory } = require('../models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    const path = require('path');
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html')); 
} 
 
router.get('/', isAuthenticated, async (req, res) => { 
    const accessories = await Accessory.findAll();  
    let images = [  
        'images/241272715.jpg', 
        'images/5e1da03c-c61c-11e9-971b-002324b25b10_5e1da03e-c61c-11e9-971b-002324b25b10-1000x1000.jpeg', 
        'images/1_org_zoom.webp', 
        'images/93fcdd3c10aea77b42aedc3fa939028f.jpg', 
        'images/HTB1ibeGSFXXXXaXXFXXq6xXFXXXk.webp', 
        'images/c1vako8jc1giskdc3ajg.jpg', 
        'images/54a697cbffd347ec357ac29160e1d407.jpg', 
        'images/product-5775e46118f59-81Yy4jgj1QL._SL1500_.jpg' 
    ];  
    res.render('Аксессуары', { accessories, images });  
}); 
 
module.exports = router;
