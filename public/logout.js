const express = require('express');
const logoutRouter = express.Router();

logoutRouter.post('/logout', (req, res) => {
  if (req.session) {    
    req.session.destroy(function(err) {
      if(err) {        
        return res.status(500).send('Что-то пошло не так');
      } else {        
        return res.send('Вы успешно вышли из системы');}    
    });
  }});
  
module.exports = logoutRouter;
