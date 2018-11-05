var index = require('./routes/index');
var users= require('./routes/users');
var uploads= require('./routes/upload');

app.use('/',index);
app.use('/',users);
app.use('/',uploads);

app.use('/upload',express.static('uploads'));