var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/pics", function(req, res) {
    db.Pics.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/pics", function(req, res) {
    db.Pics.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/pics/:id", function(req, res) {
    db.Pics.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
