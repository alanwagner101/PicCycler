// The API object contains methods for each kind of request we'll make
var addPic = $("#add-pic");
var addUser = $("#add-username");
var addChat = $("#add-chat");
var chatBox = $("#chat-area");
var StaticID;
var StaticName;

var userArr = [];

var PicAPI = {
  savePics: function (picData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/pics",
      data: JSON.stringify(picData)
    });
  },
  getPics: function () {
    return $.ajax({
      url: "api/pics",
      type: "GET"
    });
  },
  deletePics: function (id) {
    return $.ajax({
      url: "api/pics/" + id,
      type: "DELETE"
    });
  }
};

var UserAPI = {
  saveUser: function (userData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(userData)
    });
  },
  getUser: function (id) {
    return $.ajax({
      url: "api/user/" + id,
      type: "GET"
    });
  },
  getUsers: function () {
    return $.ajax({
      url: "api/user",
      type: "GET"
    });
  },
  deleteUser: function (id) {
    return $.ajax({
      url: "api/user/" + id,
      type: "DELETE"
    });
  }
};

var ChatAPI = {
  savechat: function (chatData) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/chat",
      data: JSON.stringify(chatData)
    });
  },
  getchat: function () {
    return $.ajax({
      url: "api/chat",
      type: "GET"
    });
  },
  deletechat: function (id) {
    return $.ajax({
      url: "api/chat/" + id,
      type: "DELETE"
    });
  }
};

addPic.on("click", function (event) {
  event.preventDefault();

  var picLink = $("#picLink").val().trim();
  var picTitle = $("#picTitle").val().trim();

  console.log(picLink);
  console.log(picTitle);
  console.log(StaticID);

  PicAPI.savePics({
    title: picTitle,
    link: picLink,
    UserId: StaticID
  }).then(function () {
    console.log("success");
  });

});

addUser.on("click", function (event) {
  event.preventDefault();
  userArr = [];
  userArr.push("0 slot");

  var username = $("#username").val().trim();
  StaticName = username;

  UserAPI.saveUser({
    username: username,
  }).then(function (data) {
    return UserAPI.getUser(data.id);
  }).then(function (data) {
    StaticID = data.id;
    UserAPI.getUsers({}).then(function (response) {
      console.log(response);
      for (var j = 0; j < response.length; j++) {
        userArr.push(response[j].username);
      }
      console.log(userArr);
    });
  });

});

addChat.on("click", function (event) {
  event.preventDefault();
  var chat = $("#chat").val().trim();

  ChatAPI.savechat({
    text: chat,
    UserId: StaticID
  }).then(function () {
    return ChatAPI.getchat();
  }).then(function (data) {
    chatBox.empty();
    for (var i = 0; i < data.length; i++) {
      if (data[i].UserId === StaticID) {
        var chatWords = $("<div style='float: left; margin: 10px; color: #eeeeee; padding: 5px; background: rgb(94, 190, 94); width: 70%; text-align: left'>");
        chatWords.html("<p style='width: 90%; margin-left: 20px'>" + StaticName + "-- " 
        + "</p><p style='width: 90%; margin-left: 20px'>" + data[i].text + "</p>");
        chatBox.prepend(chatWords);

      } else {
        var textdata = data[i].text;
        var chatWords = $("<div style='float: right; margin: 10px; color: #eeeeee; padding: 5px; background: rgb(120, 120, 245); width: 70%; text-align: left'>");
        chatWords.html("<p style='width: 90%; margin-left: 20px'>" + userArr[data[i].UserId] 
        + "-- " + "</p><p style='width: 90%; margin-left: 20px'>" + textdata + "</p>");
        chatBox.prepend(chatWords);
      }
    }
  });

});

function Start() {
  setInterval(function(){
    userArr = [];
    userArr.push("0 slot");
    UserAPI.getUsers({}).then(function (response) {
      for (var j = 0; j < response.length; j++) {
        userArr.push(response[j].username);
      }
      return ChatAPI.getchat();
    }).then(function (data) {
      chatBox.empty();
      for (var i = 0; i < data.length; i++) {
        if (data[i].UserId === StaticID) {
          var chatWords = $("<div style='float: left; margin: 10px; color: #eeeeee; padding: 5px; background: rgb(94, 190, 94); width: 70%; text-align: left'>");
          chatWords.html("<p style='width: 90%; margin-left: 20px'>" + StaticName + "-- " 
          + "</p><p style='width: 90%; margin-left: 20px'>" + data[i].text + "</p>");
          chatBox.prepend(chatWords);
  
        } else {
          var textdata = data[i].text;
          var chatWords = $("<div style='float: right; margin: 10px; color: #eeeeee; padding: 5px; background: rgb(120, 120, 245); width: 70%; text-align: left'>");
          chatWords.html("<p style='width: 90%; margin-left: 20px'>" + userArr[data[i].UserId] 
          + "-- " + "</p><p style='width: 90%; margin-left: 20px'>" + textdata + "</p>");
          chatBox.prepend(chatWords);
        } 
      }
    });
    // var picNumber;
    var Digits = JSON.stringify(Math.floor(Date.now()));
    var currentPic = (((Digits[6] + Digits[7] + Digits[8])%60)/2);
    console.log(Math.round(currentPic));
    PicAPI.getPics({}).then(function (response) {
      picNumber = response.length;
      // for (var k = 0; k < response.length; k++) {
        
      // }
    });
  }, 1000);
}

Start();



