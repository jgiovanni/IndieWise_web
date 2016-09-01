var fs = require('fs');
// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/121731/server.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/121731/server.crt')
};

var app = require('https').createServer(options, handler);
var io = require('socket.io')(app);
var nsp = io.of('/socket/:6001');
var Redis = require('ioredis');
var redis = new Redis('6379', 'Redis');

app.listen(6001, function() {
    console.log('Server is running!');
});

function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end('');
}

nsp.on('connection', function(socket) {
    //
});

//Subscribe to all Redis Channels
redis.psubscribe('*', function(err, count) {
    //Nothing to do here?
    console.log('Errors subscribing to channel');
});

//Broadcast message when recieved from Redis on all channels
redis.on('pmessage', function(subscribed,channel, message) {
    console.log('Message Recieved at channel(' + channel + '): ' + message);
    message = JSON.parse(message);
    nsp.emit(channel + ':' + message.event, message.data);
});