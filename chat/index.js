import express from "express";

const app = express();
app.use(express.json());
var http = require('http').createServer(app);
let io = require("socket.io")(http);

io.on('connection', function(socket) {
    socket.on('login', function(data) {
        console.log('Client logged-in:\n name: ' + data.name + '\n userid: ' + data.userid);

        socket.name = data.name;
        socket.userid = data.userid;

        io.emit('login', data.name);
    });

    socket.on('chat', function(data) {
        console.log('Message from %s: %s', socket.name, data.msg);

        var msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        }
        
        socket.broadcast.emit('chat', msg);
    });

    socket.on('forceDisconnect', function() {
        socket.disconnect();
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });
});

http.listen(23023, function() {
    console.log("listening on:23023");
})