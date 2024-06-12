const express = require('express'); 
const router = express.Router(); 
const { User } = require('./models');


// Обработка данных формы 
router.post('/register', async (req, res) => { 
  console.log(req.body); 
  try { 
    const { fio, country, birthDate, email, username, password, phoneNumber } = req.body; 
    // Создаем запись в базе данных 
    const newUser = await User.create({ fio, country, birthDate, email, username, password, phoneNumber }); 
    res.status(201).send('Пользователь успешно зарегистрирован'); 
  } catch (error) { 
    console.error(error); 
    if (error.name === 'SequelizeUniqueConstraintError') { 
      res.status(409).send('Пользователь с такими данными уже существует'); 
    } else { 
      res.status(500).send('Что-то пошло не так'); 
    } 
  } 
}); 
 
module.exports = router;
