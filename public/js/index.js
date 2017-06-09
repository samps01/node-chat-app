const socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Connection lost');
});

socket.on('newMessage',function(message){
    let formattedTime = moment(message.createdAt).format('hh:mm a');
    let template = $('#message-template').html();
    let html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage',function (message) {

    let formattedTime = moment(message.createdAt).format('hh:mm a');
    let template  = $('#location_message-template').html();
    let html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:formattedTime
    });

    $('#messages').append(html);
});


$('#message-form').on('submit',function (e) {
    e.preventDefault();

    let messageTextBox = $('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});

let locationButton = $("#send-location");
locationButton.on('click',function () {
   if(!'geolocation'in navigator){
       return alert('Geolocation is not supported');
   }

   locationButton.attr('disabled','disabled').text('Sending...');
   navigator.geolocation.getCurrentPosition(function (position) {
       locationButton.removeAttr('disabled').text('Send Location');;
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
   },function (err) {
       locationButton.removeAttr('disabled').text('Send Location');;
       alert('Unable to share the location');
   });
});
