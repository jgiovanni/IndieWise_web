var fs = require('fs');
// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/119505/server.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/119505/server.crt')
};

var app = require('https').createServer(options, handler);
var io = require('socket.io')(app);

var Redis = require('ioredis');
var redis = new Redis();

app.listen(6001, function() {
    console.log('Server is running!');
});

function handler(req, res) {
    res.writeHead(200);
    res.end('');
}

io.on('connection', function(socket) {
    //
});

redis.psubscribe('*', function(err, count) {
    //
});

redis.on('pmessage', function(subscribed, channel, message) {
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});