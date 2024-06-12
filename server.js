const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');

const { createUsers, createAdmins, createToys, createClothings, createFeeds, createAccessories } = require('./public/factories.js');
const parser = require('./public/parser'); // Подключаем файл с настройкой парсера
const registerRouter = require('./public/register'); // Подключаем файл с обработчиком регистрации
const loginRouter = require('./public/login'); //Подключаем файл с обработчиком авторизации
const profileRouter = require('./public/profile'); // Подключаем файл с обработчиком профиля
const logoutRouter = require('./public/logout'); // Подключаем файл с обработчиком выхода
const addToyToCart = require('./public/addToyToCart'); //Подключаем файл с обработчиком покупок игрушек
const addClothingToCart = require('./public/addClothingToCart'); //Подключаем файл с обработчиком покупок одежды
const addFeedToCart = require('./public/addFeedToCart'); //Подключаем файл с обработчиком покупок корма
const addAccessoryToCart = require('./public/addAccessoryToCart'); //Подключаем файл с обработчиком покупок аксессуаров
const enterRouter = require('./public/Routes/enter'); //Подключаем обработчик страницы авторизации
const cartRouter = require('./public/Routes/cart'); //Подключаем обработчик страницы корзины
const removeItemRouter = require('./public/removeItem'); //Подключаем обработчик удаления товара из корзины

//Маршруты товаров
const toyRoutes = require('./public/Routes/toys'); 
const clothingRoutes = require('./public/Routes/clothing'); 
const feedRoutes = require('./public/Routes/feed'); 
const accessoryRoutes = require('./public/Routes/accessory'); 
const shopRoutes = require('./public/Routes/shop'); 

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// Настройка сессий
app.use(session({
  secret: 'TPFtZomp0o',
  resave: false,
  saveUninitialized: true,
}));

function handleDisconnect() {
  // Создание подключения к базе данных
  var connection = mysql.createConnection({  
    host     : 'blankajx.beget.tech',
    user     : 'blankajx_animal',
    password : 'Q1qqqqqq',
    database : 'blankajx_animal',
  });

  // Подключение к базе данных
  connection.connect(function(err) {
    if (err) {
      console.error('Ошибка подключения: ' + err.stack);
      return;
    }
    console.log('Успешно подключено к базе данных с ID ' + connection.threadId);
  });

  // Обработка ошибок соединения
  connection.on('error', function(err) {
    console.error('Ошибка базы данных: ' + err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Если соединение было потеряно, повторно подключаемся
      handleDisconnect();
    } else {
      throw err;
    }
  });

  // Присваиваем подключение глобальной переменной
  global.db = connection;
}

app.use(express.urlencoded({extended: true}));

app.use(parser); // Используем настройки парсера из parser.js
app.use(registerRouter); // Используем маршрут для обработки регистрации
app.use(loginRouter); //Используем маршрут для обработки авторизации
app.use(profileRouter); // Используем маршрут для обработки профиля
app.use(logoutRouter); //Используем маршрут для обработки выхода
app.use('/enter', enterRouter); //Используем обработчик страницы входа
app.use('/cart', cartRouter); //Используем обработчик страницы корзина
app.use(removeItemRouter); //Используем обработчик удаления товара из корзины

//Использование маршрутов товаров
app.use('/toys', toyRoutes); 
app.use('/clothing', clothingRoutes); 
app.use('/feed', feedRoutes); 
app.use('/accessory', accessoryRoutes);
app.use('/shop', shopRoutes);

//Использование покупок товаров
app.use('/', addToyToCart);
app.use('/', addClothingToCart);
app.use('/', addFeedToCart);
app.use('/', addAccessoryToCart);

// Запускаем функцию обработки подключения
handleDisconnect();

//Заполняем базу данных
// async function createAll() {  
//   await createUsers();
//   await createAdmins();  
//   await createToys();
//   await createClothings();  
//   await createFeeds();
//   await createAccessories();  
//   console.log('Все функции выполнены последовательно');
// }
// createAll().catch((error) => console.error('Ошибка:', error));



// Обслуживание статических файлов из папки 'public'
app.use(express.static('public'));
app.get('/', (req, res) => {
  // Отправка файла 'index.html' в ответ на запрос к главной странице
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log("Server listening at http://localhost:" + port);
});
