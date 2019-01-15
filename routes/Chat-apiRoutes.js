var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/chat", function(req, res) {
    db.Chat.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/chat", function(req, res) {
    db.Chat.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/chat/:id", function(req, res) {
    db.Chat.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};