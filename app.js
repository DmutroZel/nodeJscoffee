// Підключаємо модуль express 
const express = require('express');
const opn = require('opn');

// Створюємо додаток Express
const app = express();

// Встановлюємо порт, на якому буде працювати сервер
const port = 3000;

// Підключаємо статичні файли з папки public
app.use(express.static('public'));

// Створюємо маршрути
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/popularProduct', (req, res) => {
  res.sendFile(__dirname + '/public/popularProduct.html');
});

app.get('/customer', (req, res) => {
  res.sendFile(__dirname + '/public/customer.html');
});

app.get('/bestProduct', (req, res) => {
  res.sendFile(__dirname + '/public/bestProduct.html');
});

app.get('/blog', (req, res) => {
  res.sendFile(__dirname + '/public/blog.html');
});

// Маршрут для помилки
app.get('/error', (req, res) => {
  res.status(404).send('Сторінка не знайдена');
});

// Запускаємо сервер і відкриваємо його в браузері
app.listen(port, () => {
  console.log(`Сервер запущений на http://localhost:${port}`);
  opn(`http://localhost:${port}`);
});

