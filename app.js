var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var currentColour = '#FFFFFF';

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log('a user connected');
  console.log('current colour is ' + currentColour);
  socket.emit('update colour', currentColour);

  socket.on('send colour', function (colour) {
    console.log('new colour: ', colour);
    currentColour = colour;
    socket.broadcast.emit('update colour', colour);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});