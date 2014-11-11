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
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  clearMessages: function() {
    $('#chats').remove();
  },
  addMessage: function(message) {
    console.log("msg", message);
    var msg = $('<li>').text(message);
    $('#chats').append(msg);
  }
};

