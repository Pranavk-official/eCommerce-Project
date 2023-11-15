const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');



module.exports = {
    // Middleware to check if the user is authenticated
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },

    // Middleware to check if the user is an admin
    isAdmin: (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            return next();
        }
        res.status(403).send('Forbidden');
    },

    // Middleware to check if the user's email is verified
    isVerified: async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id) || await User.findOne(req.user.googleId);

            console.log(user);

            if(user.isVerified === undefined){
                if (user.googleId !== undefined) {
                    return next()
                }
            }

            if (user.isVerified) {
                return next();
            }
            res.status(403).send('Email not verified');
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    },


};