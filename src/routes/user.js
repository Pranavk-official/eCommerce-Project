const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkSchema } = require('express-validator');
const User = require('../models/userSchema');
const multer = require('multer');
const { isAuthenticated, isVerified } = require('../middlewares/authMiddleware');
const upload = multer({ dest: '../public/data/uploads/' });

const loginSchema = {
    email: {
        normalizeEmail: true,
        isEmail: { errorMessage: 'Please provide a valid email address' }
    },
    password: {
        notEmpty: true,
        errorMessage: "Password field cannot be empty"
    }
};

const registrationSchema = {
    username: {
        custom: {
            options: value => {
                return User.find({ username: value }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use');
                    }
                });
            }
        }
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return User.find({ email: value }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken');
                    }
                });
            }
        }
    },
    phone: {
        notEmpty: true,
        errorMessage: "Phone number cannot be empty"
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    }
};

router.get('/login', userController.login_get);
router.get('/auth/google', userController.googleSignUp);
router.get('/auth/google/home', userController.googleSignIn);
router.post('/login', checkSchema(loginSchema), userController.login_post);
router.get('/register', userController.register_get);
router.post('/register', checkSchema(registrationSchema), userController.register_post);
router.get('/check-email', userController.email_verify);
router.get('/verify-email', userController.verify_email);
router.get('/logout', userController.logout);
router.get('/', isAuthenticated, isVerified, userController.home_get);
router.get('/home', isAuthenticated, isVerified, userController.home_get);

module.exports = router;

/**
 * GET / 
 * User Profile
 */
// router.get('/profile', isLoggedIn,userController.profile_get)

/**
 * GET / 
 * User Profile - Update page
 */
// router.get('/profile', isLoggedIn,userController.profile_edit_get)

/**
 * PUT / 
 * User Profile - Update page
 */
// router.get('/profile', isLoggedIn,userController.profile_edit_get)

/**
 * POST / 
 * Search
 */
// router.post('/search', )


// // 404
// router.get('/*', (req,res) => {
//     return res.render('404')
// })
