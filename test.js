var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3002);
console.log("Listening on port 3002");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	console.log('Connected');

	socket.on('disconnect', function(data){
		console.log('Disconnected');
	});

	socket.on('position', function(data){
		console.log(data);
		io.sockets.emit('move', {position: data});
	});
});