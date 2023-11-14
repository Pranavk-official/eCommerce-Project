/**
 * Required packages
 */
require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const nocache = require('nocache');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const { flash } = require('express-flash-message');
const passport = require('./src/config/passport-config');

const User = require('./src/models/userSchema')
const Admin = require('./src/models/adminSchema')

const userRouter = require('./src/routes/user')
const adminRouter = require('./src/routes/admin')

// DB connection variable
const connetDB = require('./src/config/db')

// Create Express App
const app = express()

// PORT
const PORT = process.env.PORT || 3000


// Static folder
app.use(express.static('public'))


// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/userLayout')
app.set('view engine', 'ejs')


// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))





/**
 * ----------------- Session Setup ---------------
 */


// Session 
app.use(cookieParser());
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals to 1 day
    }
}))

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// nocahe to stop client side caching
app.use(nocache());

// Passportjs
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
connetDB();

// passport config

// Passport config for User
// passport.use(User.createStrategy());

// // Serialize and deserialize User
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // Passport config for Admin
// passport.use(Admin.createStrategy());

// // Serialize and deserialize Admin
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());


// Routes
app.use('/', userRouter)
app.use('/admin', adminRouter)


app.listen(PORT, () => {
    console.log(`Server Connected to port ${PORT}\n\nlocal: http://localhost:${PORT}\n`);
})