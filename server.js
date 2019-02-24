const {User, Project} = require('./model');
const {PORT, DATABASE_URL} = require('./config');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/register-login', (req, res) => {
  res.sendFile(__dirname + '/public/html/register-login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/html/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

app.get('/email-confirmation', (req, res) => {
  res.sendFile(__dirname + '/public/html/email-confirmation.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/public/html/profile.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/html/home.html');
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  next();
});

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      let server;
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = app;