// The API object contains methods for each kind of request we'll make
var addPic = $("#add-pic");
var addUser = $("#add-username");
var StaticID;



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
  getUser: function (username) {
    return $.ajax({
      url: "api/user/" + username,
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

addPic.on("click", function (event) {
  event.preventDefault();

  var picLink = $("#picLink").val().trim();
  var picTitle = $("#picTitle").val().trim();

  console.log(picLink);
  console.log(picTitle);

  PicAPI.savePics({
    title: picTitle,
    link: picLink,
    UserId: StaticID
  }).then(function() {
    console.log("success");
  });

});

addUser.on("click", function (event) {
  event.preventDefault();

  var username = $("#username").val().trim();

  UserAPI.saveUser({
    username: username,
  }).then(function() {
    return UserAPI.getUser(username);
  }).then(function(data){
    StaticID = data.id;
  });

});


