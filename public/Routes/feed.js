const express = require('express'); 
const router = express.Router(); 
const { Feed } = require('../models'); 
 
// Функция для проверки авторизации 
function isAuthenticated(req, res, next) { 
    if (req.session && req.session.user) { 
        return next(); 
    } 
    const path = require('path');
    res.status(401).sendFile(path.join(__dirname, '../Вход-или-Регистрация.html'));
} 
 
router.get('/', isAuthenticated, async (req, res) => { 
    const feeds = await Feed.findAll();  
    let images = [  
        'images/bags2x.png', 
        'images/7b8d8ae418f13dfdc234028bdd5cb108.jpg', 
        'images/ebace42cd35e5673280f3a27605f14e4.jpg', 
        'images/phpijIqf71.jpg', 
        'images/xj2eiv00cw5hx3drjupem1osr41q4g94.jpg', 
        'images/cloud-net-valta-storage-pictures-Goods-e885a74c-44b8-11e0-bb8f-001517e97967_1x1_2-1200x800.jpg', 
        'images/Lolo_70214-500x500-750x750.jpg', 
        'images/6042457649.jpg' 
    ];  
    res.render('Корм', { feeds, images });  
}); 
 
module.exports = router;
