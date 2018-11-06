#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app.js');
var debug = require('debug')('kkd89:server');
var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
var fs = require('fs');

http.listen(8002);

function handler(req,res)
{
  fs.readFile(__dirname + './index.html',
  function(err,data)
  {
      if(err)
      {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
  });
}

io.socket.on('connection',function(socket)
{
  socket.emit('news',{hello:'world'});
  socket.on('my other event', function (data)
  {
      console.log(data);
  });
});
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8002');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
