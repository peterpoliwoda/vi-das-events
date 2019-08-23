const express = require('express');
const app = express();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/event', function(req, res) {
    io.emit('event', { type: 'incident' });
    res.send('Roger that! Event will flash on website now.');
});

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('event', function() {
        console.log('event detected!');
    });
});

http.listen(appEnv.port, function() {
    console.log('Server listening on: ' + appEnv.url);
});
