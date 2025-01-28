const express = require('express');
const opn = require('opn');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

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

app.get('/leads', (req, res) => {
  const filePath = path.join(__dirname, 'leads.txt');

  if (!fs.existsSync(filePath)) {
    return res.status(200).send('<h1>Жодного збереженого email немає.</h1>');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Помилка при читанні файлу:', err);
      return res.status(500).send('Помилка при читанні файлу.');
    }

    const emailList = data
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => `<p>${index + 1}. ${line}</p>`)
      .join('');

    res.send(`<h1>Збережені email</h1>${emailList}`);
  });
});

app.post('/save-email', (req, res) => {
  const email = req.body.email;
  const filePath = path.join(__dirname, 'leads.txt');

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('Некоректна адреса email.');
  }

  const entry = `${email} - ${new Date().toISOString()}\n`;

  fs.appendFile(filePath, entry, err => {
    if (err) {
      console.error('Помилка при записі у файл:', err);
      return res.status(500).send('Помилка при збереженні email.');
    }
    res.status(200).send('Email успішно збережено.');
  });
});

app.get('/error', (req, res) => {
  res.status(404).send('Сторінка не знайдена');
});

app.listen(port, () => {
  console.log(`Сервер запущений на http://localhost:${port}`);
  opn(`http://localhost:${port}`);
});
