var fs = require('fs');
// This line is from the Node.js HTTPS documentation.
var options = {
    key: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/121731/server.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/getindiewise.com/121731/server.crt')
};
// var express = require('express')();
var app = require('https').createServer(options);
var io = require('socket.io')(app);

// Redis
var Redis = require('ioredis');
var redis = new Redis();

app.listen(3000, function() {
    console.log('Server is running!');
});

function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end('');
}

io.on('connection', function(socket) {
    console.log(socket);
});

//Subscribe to all Redis Channels
redis.psubscribe('*', function(err, count) {
    console.log(err);
    console.log(count);
});

//Broadcast message when recieved from Redis on all channels
redis.on('pmessage', function(subscribed, channel, message) {
    console.log('Message Recieved at channel(' + channel + '): ' + message);
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
});