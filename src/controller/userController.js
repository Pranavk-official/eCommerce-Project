const { validationResult } = require('express-validator')
const User = require('../models/userSchema');
const passport = require('passport');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer({ dest: '../public/data/uploads/' })


const sendVerifyEmail = async (name, email,token) => {

    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: process.env.BREVO_PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.BREVO_MAIL,
                pass: process.env.BREVO_KEY
            }
        });

        let mailOptions = {
            from: 'pranavkcse@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Hi ${name}, Click on the link to verify your email: ` +
                `<a href="http://localhost:${process.env.PORT}/verify-email?token=${token}">verify email</a>`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('There was an error: ', err);
            } else {
                console.log('Here is the response: ', response);
                res.redirect('/verify-email');
            }

        });
    } catch (error) {
        console.log(error.message);
    }

}


/**
 * Verify Email
*/

exports.verify_email = async (req, res) => {
    try {
        
        const user = await User.findOneAndUpdate(
            { verificationToken: req.query.token },
            { isVerified: true }
        );

        if (!user) {
            return res.status(400).send('Invalid verification token');
        }

        return res.render('user/emailVerified')

    } catch (error) {
        console.log(error.message);
    }
};
exports.email_verify = async (req, res) => {
    
    const locals = {
        title: 'eCommerce Project | verify user'
    }

    try {
        return res.render('user/emailVerify', {
            locals,
            message: 'verification mail send'
        })
    } catch (error) {
        console.log(error.message);
    }

};



/**
 * Login
 */

exports.login_get = (req, res) => {
    const locals = {
        title: "eCommerce Project | Login"
    }
    try {
        if (req.isAuthenticated()) {
            // console.log(req.userId);
            res.redirect('/home')
        } else {
            res.render('login', {
                locals
            });
        }
    } catch (error) {
        console.log(error);
    }
}


exports.login_post = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, (error) => {
        if (error) {
            console.log(error.message);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/home')
            })
        }
    })
}

/**
 * Register
 */

exports.register_get = (req, res) => {
    const locals = {
        title: "eCommerce Project | Register/Sign Up"
    }
    try {
        if (req.isAuthenticated()) {
            res.redirect('/home')
        } else {

            res.render('register', {
                locals,
            });
        }
    } catch (error) {
        console.log(error);
    }
}


exports.register_post = async (req, res) => {
    const locals = {
        title: "eCommerce Project | Register/Sign Up"
    }
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const alert = errors.array()
            res.render('register', {
                alert
            })
        } else {

            const token = crypto.randomBytes(20).toString('hex');

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                verificationToken: token
            })

            // Create a new user
            User.register(user, req.body.password, (err, user) => {
                console.log(user);
                if (err) {
                    console.log(err);
                    return res.render('register', { message: 'Registration failed' });
                }

                sendVerifyEmail(req.body.username, req.body.email,token)
                // passport.authenticate('local')(req,res, () => {
                //     res.redirect('/home')
                // })
            });

        }

    } catch (error) {
        console.log(error);
    }
}


exports.home_get = async (req, res) => {
    try {
        // console.log(req.user);
        res.render("index", {
            userdata: req.user
        })

    } catch (error) {
        console.log(error);
    }
}




/**
 * Logout
 */

exports.logout = (req, res, next) => {
    try {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
    }
}




/**
 * Profile
 */


const profile_get = (req, res) => {

    const locals = {
        title: "eCmommerce Project | User Profile"
    }

    try {
        const userData = User.findById(req.user.userId)
        return res.render('profile', {
            locals,
        })
    } catch (error) {
        console.log(error);
    }
}

const profile_add = (req, res) => {

    const locals = {
        title: "eCmommerce Project | User Profile"
    }

    try {
        return res.render('profile', {
            locals,
        })
    } catch (error) {
        console.log(error);
    }
}