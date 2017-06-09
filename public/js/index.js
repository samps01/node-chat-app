const socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Connection lost');
});

socket.on('newMessage',function(message){
    console.log(message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">My Current Location</a>')
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val()
    },function(){

    });
});

let locationButton = $("#send-location");
locationButton.on('click',function () {
   if(!'geolocation'in navigator){
       return alert('Geolocation is not supported');
   }
   navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
   },function (err) {
       alert('Unable to share the location');
   });
});
