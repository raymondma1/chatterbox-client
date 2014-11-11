// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){
    app.fetch();
  },
  send: function(message){
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: message sent');
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: '-createdAt'},
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        data.results.reverse();
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
    if (message.text && !app.objectIds[message.objectId]) {
      var username = $('<div class="username">').text(message.username);
      var text = $('<div>').text(message.text);
      var time = $('<div>').text(message.createdAt);
      var msg = $('<div class = "chat">').append(username).append(text).append(time);
      var msgId = message.objectId;
        app.objectIds[msgId]=true;
        $('#chats').prepend(msg);
    }
  },
  addRoom: function(room) {
    var cRoom = $('<input type="radio" name="room" value="' + room  +'">' + room)
    $('#roomSelect').append(cRoom);
  },
  addFriend: function(username) {
    app.friends[username] = true;
  },
  handleSubmit: function(message) {
    app.send(message);
  },
  friends: {},
  makeId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  objectIds: {}
};



$(document).ready(function() {
  app.init();
  $('#chats').on('click', '.username', function(event) {
    var friend = event.currentTarget.textContent;
    app.addFriend(friend);
  });
  $('#send').on('submit', function(event) {
    var text = $('#message').val();
    var time = new Date(event.timeStamp).toISOString();
    var msg = {
      username: "secret",
      text: text
      //roomname: "lobby",
      //createdAt: time,
      //updatedAt: time,
      //objectId: app.makeId()
    }
    event.preventDefault();
    app.handleSubmit(msg);
    app.fetch();
  });
  $('#refresh').on('submit', function(event) {
    event.preventDefault();
    app.fetch();
  })
});
