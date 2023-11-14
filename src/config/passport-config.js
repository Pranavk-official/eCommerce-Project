// passport-config.js

const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

// Passport config for User
passport.use(User.createStrategy());

// // // Serialize and deserialize User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


module.exports = passport;
