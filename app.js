var port = process.env.PORT || 1337;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/:doc', function(req, res) {
	res.sendfile(req.params.doc);
});

io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('send colour', function(colour){
    console.log('new colour: ', colour);
    socket.broadcast.emit('update colour', colour);
  });



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});