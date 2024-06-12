const express = require('express');
const multer  = require('multer');

const upload = multer();
const app = express();

// Парсим тело запроса в формате json и urlencoded
app.use(express.json());app.use(express.urlencoded({ extended: true }));

// Парсим multipart/form-data
app.use(upload.array()); app.use(express.static('public'));

module.exports = app;
