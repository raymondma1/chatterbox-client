// YOUR CODE HERE:

var app = {
  init: function(){},
  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: message sent');
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        _.each(data.results,function(message){
          app.addMessage(message);
        });
      },
      error: function(data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(message) {
    var username = $('<div class="username">').text(message.username);
    var text = $('<div>').text(message.text);
    var msg = $('<div class = "chat">').append(username).append(text);
    $('#chats').append(msg);
  },
  addRoom: function(room) {
    var cRoom = $('<input type="radio" name="room" value="' + room  +'">' + room)
    $('#roomSelect').append(cRoom);
  },
  addFriend: function(username) {


  }
};

$(document).ready(function() {
  app.fetch();
  $('#chats').on('click','.username',function() {
    console.log("click event")
  });
});
