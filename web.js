var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var multer = require('multer');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');
var uploads = require('./routes/upload');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static('upload'));

//app.use('/', index);
app.use('/users', users);
app.use('/upload', uploads);

var port = normalizePort(process.env.PORT || '8002');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
