var os = require( 'os' );
var util = require('util');

exports.Print = function(str)
{
  console.log(str);
}

exports.TimeStamp = function()
{
  var dt = new Date();
  return util.format('[%d-%d-%d_%d:%d:%d.%d]', dt.getYear()+1900, dt.getMonth()+1, dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
}

exports.GetIP = function()
{
  var interfaces = require('os').networkInterfaces();
  for (var name in interfaces)
  {
    var interface = interfaces[name];

    for (var i = 0; i < interface.length; i++)
    {
      var alias = interface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

global.TimeStamp = exports.TimeStamp;
global.GetIP = exports.GetIP;
global.Print =  exports.Print;
