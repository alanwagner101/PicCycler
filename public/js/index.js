// The API object contains methods for each kind of request we'll make
var addPic = $("#add-pic");
var addChat = $("#add-chat");
var chatBox = $("#chat-area");
var picBox = $("#picBox");
var StaticID;
var StaticName;

var nickname = $("#nickname").text().trim();
console.log(nickname);

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
  getuserName: function (nickname) {
    return $.ajax({
      url: "api/usernames/" + nickname,
      type: "GET"
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

  var emptyLink = $("#picLink");
  var emptyTitle = $("#picTitle");

  emptyLink.val("");
  emptyTitle.val("");

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

function addNickname() {
  StaticName = nickname;

  UserAPI.getuserName(nickname).then(function(results){
    if (results === null) {
      UserAPI.saveUser({
        username: nickname,
      }).then(function (data) {
        return UserAPI.getUser(data.id);
      }).then(function (data) {
        StaticID = data.id;
        UserAPI.getUsers({}).then(function (response) {
          for (var j = 0; j < response.length; j++) {
            userArr.push(response[j].username);
          }
        });
      });
    } else {
      StaticID = results.id;
      return false;
    }
  });
}


addChat.on("click", function (event) {
  event.preventDefault();
  var chat = $("#chat").val().trim();

  emptyChat = $("#chat");

  emptyChat.val("");

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
    var userArr = [];
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
          var chatWords = $("<div style='float: left; border-radius: 20px; margin: 10px; color: #eeeeee; padding: 10px; background: rgb(94, 190, 94); width: 70%; text-align: left'>");
          chatWords.html("<p class='chatNames' style='width: 80%; margin: 0px; margin-left: 20px;'>" + StaticName + "-- " 
          + "</p><p style='width: 80%; margin: 0px; margin-left: 20px;'>" + data[i].text + "</p>");
          chatBox.prepend(chatWords);
  
        } else {
          var textdata = data[i].text;
          var chatWords = $("<div style='float: right; border-radius: 20px; margin: 10px; color: #eeeeee; padding: 10px; background: rgb(120, 120, 245); width: 70%; text-align: left'>");
          chatWords.html("<p class='chatNames' style='width: 80%; margin: 0px; margin-left: 20px;'>" + userArr[data[i].UserId] 
          + "-- " + "</p><p style='width: 80%; margin: 0px; margin-left: 20px;'>" + textdata + "</p>");
          chatBox.prepend(chatWords);
        } 
      }
      addNickname();
    });
    PicAPI.getPics({}).then(function (response) {
      var picNumber = (response.length + 1) * 1.5;
      var Digits = JSON.stringify(Math.round(Date.now()));
      var currentPic = ((Digits[6] + Digits[7] + Digits[8])%picNumber)/1.5;
      for (var k = 0; k < response.length; k++) {
        if(currentPic === 0) {
          picBox.empty();
          var beginningSlide = $("<div>");
          beginningSlide.html("<h1>Thank You for coming to PicCycler</h1>");
          picBox.append(beginningSlide);
        } else if (response[k].id === currentPic) {
          picBox.empty();
          var picWords = $("<div style='text-align: center; color: #ffffff'>");
          picWords.html("<h2>" + response[k].title + "</h2>");
          picBox.append(picWords);
          var picUser = $("<div style='text-align: center; color: #ffffff'>");
          picUser.html("<p>" + userArr[response[k].UserId] + "</p>");
          picBox.append(picUser);
          var picLink = $("<div id='boximg' style=' text-align: center;'>");
          picLink.html("<img src='" + response[k].link + "'>");
          picBox.append(picLink);
        } else {
          // return false;
        }
      }
    });
  }, 1500);
}

Start();



