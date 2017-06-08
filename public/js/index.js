const socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
    // socket.emit('createMessage',{
    //     from:'sam',
    //     text:'Hello'
    // });
});

socket.on('disconnect',function(){
    console.log('Connection lost');
});

socket.on('newMessage',function(message){
    console.log(message);
});

