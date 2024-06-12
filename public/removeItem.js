const express = require('express'); 
const router = express.Router(); 
const { Toy, Clothing, Feed, Accessory } = require('./models'); 
 
let models = { 
  'toys': Toy, 
  'clothes': Clothing, 
  'feeds': Feed, 
  'accessories': Accessory 
}; 
 
router.post('/removeItem/:category', function(req, res) { 
  let itemId = req.body.itemId; 
  let category = req.params.category; 
  let Model = models[category]; 
  Model.destroy({ 
    where: { 
      id: itemId 
    } 
  }) 
  .then(() => { 
    res.json({ success: true }); 
  }) 
  .catch(err => { 
    // обработка ошибок 
    res.json({ success: false }); 
  }); 
}); 
 
module.exports = router;
