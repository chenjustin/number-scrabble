const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const http = require('http').Server(app);
var io = require('socket.io')(http);

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;
 
const compiler = webpack(webpackConfig);

// lobby socket
var lobby = io.of('lobby');

// online users
var onlineUsers = [];
var idNumber = 0;
 
app.use(express.static(__dirname + '/public'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

http.listen(port, function(){
  console.log("listening on " + port);
});

/* Socket.io logic */

lobby.on('connection', function(socket){

  // The server keeps track of all online users
  onlineUsers.push({playerName: socket.handshake.query.playerName, id: idNumber, socketId: socket.id});
  var playerId = idNumber;
  idNumber++;

  // Not sure if this is necessary
  if(playerId > 9500){
    playerId = 0;
  }

  lobby.emit('update-list', onlineUsers);

  console.log('User connected. List: ' + onlineUsers);

  socket.on('invite-someone', function(payload){
    console.log(payload.recipient);
    console.log(payload.sender);
    socket.broadcast.to(payload.recipient).emit('someone-clicked', payload.sender);
  });

  socket.on('disconnect', function(){
    onlineUsers.forEach(function(element, index){
      if(element.id === playerId){
        onlineUsers.splice(index, 1);
        lobby.emit('update-list', onlineUsers);
        console.log('User disconnected. List: ' + onlineUsers);
      }
    });
  });

});

/*
io.on('connection', function(socket){
  onlineUsers.push({name: socket.handshake.query.playerName, id: idNumber});
  var id = idNumber;
  idNumber++;

  

  // Not sure if this is necessary

  if(id > 9500){
    id = 0;
  }

  

  console.log(onlineUsers);

  socket.on('disconnect', function(socket){
    console.log("disconnected");
    onlineUsers.forEach(function(element, index){
      console.log(element.id);
      if(element.id === id){
        onlineUsers.splice(index, 1);
        console.log(onlineUsers);
      }
    });
  });
});
*/