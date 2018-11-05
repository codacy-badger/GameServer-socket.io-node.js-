var http = require('http');
var port = process.env.PORT;
var appname = "kkd89";
var userid = "kkd89";

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end('hello' );
}).listen(port);
