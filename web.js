console.log('-----start server-----\r\n');

var fs = require('fs');
var util = require('util');
var path = require('path');
var async = require('async');
var http = require('http');
var express = require('express');
var app = express();

app.get('/index.html', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

function Print(str)
{
  console.log(str);
}

function TimeStamp()
{
  var dt = new Date();
  return util.format('[%d-%d-%d_%d:%d:%d.%d]', dt.getYear()+1900, dt.getMonth()+1, dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
}

var serverInfo = null;
function PrintServerInfo(config)
{
  serverInfo =  'ServerIP  : ' + config.ServerIP + '\r\n';
  serverInfo += 'TimeStamp : ' + TimeStamp() + '\r\n';
  serverInfo += 'Version   : ' + config.Version + '\r\n';

  Print(serverInfo);
}

var server = null;
var io = null;
var router = null;

function Main()
{
  var defaultConfigFile = 'ServerConfig.json';
  var info = fs.readFileSync(defaultConfigFile,'utf8');
  var config = JSON.parse(info);

  PrintServerInfo(config);

  async.series
  (
    [
      function(callback)
      {
        server = http.createServer(app);//express사용하여 http 서버 생성
        io = require('socket.io')(server);//생성된 http 서버를 socket.io 서버로 업그레이드
        server.listen(config.ServerPort,function(){console.log('listening on :' + config.ServerPort);});
        router = require('socket.io-events')();
        io.use(router);
        callback();
      },
    ],
    function(err,results)
    {
      process.on('uncaughtException', function(err){console.log(err.stack);});
      console.log('-----start success-----\r\n');
    }
  )
}

Main();
