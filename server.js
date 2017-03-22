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

lobby.on('connection', function(socket){

  onlineUsers.push({name: socket.handshake.query.playerName, id: idNumber});
  var id = idNumber;
  idNumber++;

  // Not sure if this is necessary

  if(id > 9500){
    id = 0;
  }

  socket.on('disconnect', function(socket){
    onlineUsers.forEach(function(element, index){
      if(element.id === id){
        onlineUsers.splice(index, 1);
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