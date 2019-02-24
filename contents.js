global.router = require('socket.io-events')();

module.exports = function (server)
{
    module.exports.io = require('socket.io')(server);//생성된 http 서버를 socket.io 서버로 업그레이드
    module.exports.io.use(global.router);
}

router.on("C2S_TEST", function (socket, args, next)
{
    global.Print("[INFO][C2S_TEST] socket.id:" + socket.id + " ip:" + socket.remoteAddress);

    var recvData = JSON.parse(args[1]);

    var SendData = {
        error : 0,
        testInfo :
        {
          ip : recvData.testInfo.ip,
          port : recvData.testInfo.port,
          vertion : recvData.testInfo.version
        }
    };

    SendData.testInfo.ip = GetIP();
    SendData.testInfo.port = config.ServerPort;
    SendData.testInfo.version = config.Version;

    socket.emit("S2C_TEST", JSON.stringify(SendData));

});

router.on("connection", function (socket)
{
    global.Print("[INFO][C2S_TEST] socket.id:" + socket.id + " ip:" + socket.remoteAddress);
});
