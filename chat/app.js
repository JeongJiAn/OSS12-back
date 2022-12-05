const app = require('express')();
var http = require('http').createServer(app);
let io = require("socket.io")(http);

var chat = io.of('/chat').on('connection', function(socket) {
    socket.on('login', function(data) {
        console.log('Client logged-in:\n name: ' + data.name);

        socket.name = data.name;

        chat.emit('login', data.name);
    });

    socket.on('chat', function(data) {
        console.log('Message from %s: %s', socket.name, data.msg);

        var msg = {
            from: {
                user: socket.user
            },
            msg: data.msg
        }
        
        chat.emit('chat', msg);
    });

    socket.on('forceDisconnect', function() {
        socket.disconnect();
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });
})

http.listen(23023, function() {
    console.log("listening on:23023");
})