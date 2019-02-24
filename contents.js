global.router = require('socket.io-events')();

module.exports = function (server)
{
    module.exports.io = require('socket.io').listen(server);//생성된 http 서버를 socket.io 서버로 업그레이드
    module.exports.io.use(global.router);
}

router.on("C2S_TEST", function (socket, args, next)
{
    console.log('C2S_TEST');

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
