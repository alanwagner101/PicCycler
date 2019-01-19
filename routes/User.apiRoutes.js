var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.get("/api/usernames/:username", function(req, res) {
    db.User.findOne({ where : { username : req.params.username } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({ where : { id : req.params.id } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(UserDB) {
      res.json(UserDB);
    });
  });

  // Delete an example by id
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(UserDB) {
      res.json(UserDB);
    });
  });
};