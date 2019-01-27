const express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

app.listen(process.env.PORT || 8080);

module.exports = app;