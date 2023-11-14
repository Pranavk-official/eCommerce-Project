const { validationResult } = require('express-validator')
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Admin = require('../models/userSchema')
const User = require('../models/userSchema')
const adminLayout = './layouts/adminLayout'


exports.homepage = (req, res) => {
    const locals = {
        title: "eCommerce Project | Admin Homepage"
    }
    try {
        res.render('admin/index', {
            locals,
            admindata: req.user,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
}

exports.login_get = (req, res) => {
    const locals = {
        title: "eCommerce Project | Admin Login"
    }
    try {

        if (req.isAuthenticated()) {
            res.redirect('/admin')
        } else {
            res.render('admin/login', {
                locals,
                layout: adminLayout
            });
        }

    } catch (error) {
        console.log(error);
    }
}

exports.login_post = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }

        if (!user) {
            console.log(info);
            // Handle authentication failure
            return res.render('admin/login', { message: 'Authentication failed' });
        }

        // Check if the user type is 'Admin'
        // if (user.type !== 'Admin') {
        //     // Handle admin trying to log in as user
        //     return res.render('admin/login', { message: 'Unauthorized' });
        // }

        // Authenticate the user and create a session
        req.login(user, (loginErr) => {
            if (loginErr) {
                console.log(loginErr);
                return next(loginErr);
            }

            req.session.isAuthenticated = true
            // Authentication successful, redirect to the home page
            return res.redirect('/admin/');
        });
    })(req, res, next);
}

exports.register_get = (req, res) => {
    const locals = {
        title: "eCommerce Project | Admin Register/Sign Up"
    }
    try {
        if (req.isAuthenticated()) {
            res.redirect('/admin')
        } else {
            res.render('admin/register', {
                locals,
                layout: adminLayout
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.register_post = (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const alert = errors.array();
            res.render('register', {
                alert
            });
        } else {
            // Register the user using Passport Local Mongoose
            Admin.register(new Admin({
                username: req.body.username,
                email: req.body.email,
            }), req.body.password, (err, admin) => {
                if (err) {
                    console.log(err);
                    return res.render('admin/register', { message: 'Registration failed' });
                }
        
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/admin');
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.home_get = (req, res) => {
    const locals = {
        title: "eCommerce Project | Home"
    }
    try {
        res.render('admin/index', {
            locals
        });
    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            req.session.destroy()
            res.redirect('/admin');
        });
    } catch (error) {
        console.log(error);
    }
}



exports.viewUsers = async (req, res) => {

    const messages = await req.consumeFlash('info')

    const locals = {
        title: "eCommerce Project | User Management",
        description: ""
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {

        const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await User.countDocuments();


        res.render('admin/users', {
            locals,
            users,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    }


}

exports.viewUser = async (req, res) => {
    
    const locals = {
        title: "eCommerce Project | View User Data",
        description: "User Management System"
    }

    try {
        const user = await User.findOne({ _id: req.params.id })

        console.log(user.profile);

        res.render('admin/viewUser', {
            locals,
            user,
            userProfile: user.profile[0],
            userAddress: user.profile[0].address[0],
            layout: adminLayout
        })

    } catch (error) {
        console.log(error);
    }

}