var express = require("express");
var l = require("../libs/winston")("secret-route");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

// DB
mongoose.connect('mongodb://localhost/web-scaffolding',{ useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 5000 })
.then(() => l.info(`Connected to MongoDB!`))
.catch(err => l.error(`Couldn't connect to MongoDB ${err}`));
var userModel = require('../models/userModel');

/*
new userModel({name: "paul",pass: "asd", email:"paul@storm-interactive.com"}).validateSave((err,doc)=>{
  if(err) { l.error(`Error adding user(${err})`); return };
  l.info(`Added user: ${doc}`);
});
*/

// Express Session
router.use(session({ secret: 'secretroutepass', saveUninitialized: true, cookie: { maxAge : 60*000 } /* 1 minute */, resave: true,store: new MongoStore({ mongooseConnection: mongoose.connection }) }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id); // save user ID to session
});

passport.deserializeUser(function(id, done) {
  userModel.findOne({
    _id: id
  },function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  // done(null,user) for success, done(err,false) for error, done(null,false) for wrong pass
  l.debug(`Tryging to login with user: ${username} and password: ${password}`);
  userModel.findOne({
      name: username
  }, function(err, user) {
      // This is how you handle error
      if (err) { l.error(err); return done(err); }
      // When user is not found
      l.debug(`User found`);
      if (!user) { l.error(`User not found`); return done(null, false); }
      // When password is not correct
      if (user.pass != password){ l.error(`Auth error`); return done(null, false);}
      // When all things are good, we return the user
      l.info(`All good, user ${user} logged in`);
      return done(null, user);
   });
}));

isLoggedIn = (req,res,next) => {
  if (req.user) {next()}
  else {l.error(`Unauthenticated, redirecting to login`); res.redirect('/secret/login');}
}

router.get("/", isLoggedIn, (req, res) => {
  res.send(`This will be secret content. Logged in user: ${req.user} <a href='/secret/logout'>Logout</a>`);
});

router.get("/login",(req,res)=>{
    res.render('secret/login');
});

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect('/secret/login?LoggedOut');
});

router.post("/login",
    passport.authenticate('local', { failureRedirect: '/secret/login?loginError' }),
    (req,res)=>{
      res.redirect("/secret");
    });


module.exports = router;