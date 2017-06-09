const socket = io();

function scrollToBottom() {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child')
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    let params = $.deparam(window.location.search);

    socket.emit('join',params,function (err) {
        if(err){
            //alert(err);
            window.location.href = '/';
        }else{
            console.log('No err')
        }
    });
});

socket.on('disconnect',function(){
    console.log('Connection lost');
});
socket.on('updateUserList',function (users) {
    let ol = $('<ol></ol>');
    users.forEach(function (user){
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
});


$('#message-form').on('submit',function (e) {
    e.preventDefault();

    let messageTextBox = $('[name=message]');
    socket.emit('createMessage',{
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
