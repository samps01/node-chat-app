const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user');

   socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message,callback)=>{
      console.log(message);
      io.emit('newMessage',generateMessage(message.from,message.text));
      callback('Got it');
   });

    socket.on('createLocationMessage',(location)=>{
        io.emit('newLocationMessage',generateLocationMessage('User',location.latitude,location.longitude));
    });
   socket.on('disconnect',()=>{
      console.log('Client disconnected');
   });
});

server.listen(port,()=>{
   console.log(`Server running on ${port}`);
});
