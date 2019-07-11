console.log('-----start server-----\r\n');

var fs = require('fs');
var path = require('path');
var async = require('async');
var http = require('http');
var express = require('express');
var app = express();

var util = require('./util.js');

app.get('/index.html', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

var serverInfo = null;
function PrintServerInfo(config)
{
  serverInfo =  'ServerIP  : ' + GetIP() + '\r\n';
  serverInfo += 'TimeStamp : ' + TimeStamp() + '\r\n';
  serverInfo += 'Version   : ' + config.Version + '\r\n';

  Print(serverInfo);
}

var server = null;
var io = null;
var router = null;

function Main()
{
  var defaultConfigFile = path.join(__dirname + '/ServerConfig.json');
  var info = fs.readFileSync(defaultConfigFile,'utf8');
  global.config = JSON.parse(info);

  PrintServerInfo(config);

  async.series
  (
    [
      function(callback)
      {
        server = http.createServer(app);//express사용하여 http 서버 생성
        server.listen(config.ServerPort,function(){console.log('listening on :' + config.ServerPort);});

        //require("./contents.js")(server);
        //contents.js로 모듈화
        io = require('socket.io')(server,{transport: ['websocket']});//생성된 http 서버를 socket.io 서버로 업그레이드
        router = require('socket.io-events')();
        io.use(router);

        callback();
      },
    ],
    function(err,results)
    {
      process.on('uncaughtException', function(err){console.log(err.stack);});
    }
  )
}

Main();

router.on("CLIENT_TO_SERVER_CHAT", function (socket, args, next)
{
    var recvData = JSON.parse(args[1]);

    var SendData = {
        error : 0,
        _chatInfo :
        {
          uniqueID : recvData._chatInfo.uniqueID,
          msg : recvData._chatInfo.msg,
          time : recvData._chatInfo.time
        }
    };
	
	global.Print("[INFO][CLIENT_TO_SERVER_CHAT]\nsocket.id:" + socket.id + "\nid:" + recvData._chatInfo.uniqueID + "\nmsg:" + recvData._chatInfo.msg + "\ntime:" + recvData._chatInfo.time);
	io.sockets.emit("SERVER_TO_CLIENT_CHAT", JSON.stringify(SendData));
});
