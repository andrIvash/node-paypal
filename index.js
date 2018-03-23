const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'pug');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// req.body доступ к данным
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));// support encoded bodies

// подключение routes
require('./routes')(app);

// cтатика
app.use(express.static(path.join(__dirname, 'public')));

// set public directory to serve static html files
app.use('/', express.static(path.join(__dirname, 'public')));

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
