var db = require("../models");
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
var session = require("express-session");


// Passport Stuff
var strategy = new Auth0Strategy (
  {
    domain: "piccycler.auth0.com",
    clientID: "0d5s2fJvok5ZDJzdtxyDSKeWDiLhbPst",
    clientSecret: "moRuQPW1YqT6JA6yxpnjDXOZG8eAxHqI6Au_pY966qy6ZdHhPb4zmEUUyEN1pj8D", 
    callbackURL: "http://localhost:3000/callback"
  },
  function (accessToken, refreshToken, extraParam, profile, done) {
    return done(null, profile);
  }
);
  
passport.use(strategy);
  
passport.serializeUser(function(user, done){
  done(null, user);
});
  
passport.deserializeUser(function(user, done){
  done(null, user);
});
module.exports = function(app) {  

  app.use(
    session({
      secret:"pic cylcer",
      resave: true,
      saveUnitialize: true
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(function (req, res, next){
    res.locals.loggedIn = false;
    if (req.session.passport && typeof req.session.passport.user != "undefined") {
      res.locals.loggedIn = true;
    }
    next();  
  });
  app.get("/", function (req, res, next){
    res.render("index");
  });
  
  app.get("/login", passport.authenticate("auth0", {
    scope: "openid profile"}));
  
  app.get("/logout", function (req, res){
    req.logout();
    res.redirect("/");
  });
  
  app.get("/callback", 
    passport.authenticate("auth0", {
      failureRedirect: "/failure"
    }),
    function(req, res) {
      res.redirect("/user");
    }
  );
  
  app.get("/user", function(req, res, next){
    res.render("user", {
      user: req.user
    });
  });
  
  // app.get("/failure", function(req, res, next){
  //   res.render("failure");
  // });

  app.get("/login", passport.authenticate("auth0", {
    scope: "openid profile"}));
};