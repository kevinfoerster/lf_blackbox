var sys = require('sys');
var exec = require('child_process').exec;
var restify = require('restify');
var io = require('socket.io').listen(3000);


var server = restify.createServer();
// server.get('/timestamp/:timestamp', socketOff);
// server.head('/timestamp/:timestamp', socketOff);

// server.listen(8080, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });

io.sockets.on('connection', function(socket) {
  // socket.emit('news', { hello: 'world' });

  socket.on('timestamp', function(timestamp) {
      console.log(timestamp);
      socket.emit('updateTimestamp', {timestamp: timestamp});
      socket.broadcast.emit('updateTimestamp', {timestamp: timestamp});

    // });
  });

  socket.on('toggle', function(timestamp) {
      console.log(timestamp);
      socket.emit('toggle');
      socket.broadcast.emit('toggle');

    // });
  });
});