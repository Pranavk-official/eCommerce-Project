const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkSchema } = require('express-validator')
const User = require('../models/userSchema');
const multer = require('multer');
const upload = multer({dest: '../public/data/uploads/'}) 

/**
 * Schema Validation
 * 
 */
const loginSchema = {
    email: {
        normalizeEmail: true,
        isEmail: {
            errorMessage: 'Please provide a valid email address'
        }
    },
    password: {
        notEmpty: true,
        errorMessage: "Password field cannot be empty"
    }
}


const registrationSchema = {
    username: {
        custom: {
            options: value => {
                return User.find({
                    username: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Username already in use')
                    }
                })
            }
        }
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
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
}

// const authMiddleware = (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.redirect('/login');
//         } else {
//             // Verify the token using the correct secret key.
//             const decoded = jwt.verify(token, jwtSecret);
//             req.userId = decoded.userId;

//             if (req.session.authorized) {
//                 next();
//             } else {
//                 return res.render('login', {
//                     title: 'Login Page',
//                     error: null,
//                     authorized: false,
//                 });
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };


const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }else {
        return res.redirect('/login');
    }
}




/***************************************************************************************************************** */

/**
 * GET / 
 * Log In
 */
router.get('/login',userController.login_get)

/**
 * POST / 
 * Log In
 */
router.post('/login', checkSchema(loginSchema), userController.login_post)

/**
 * GET / 
 * Register
 */
router.get('/register', userController.register_get)

/**
 * POST / 
 * Register
*/
router.post('/register', checkSchema(registrationSchema),userController.register_post)

/**
 * GET / 
 * Verify Email
 */
router.get('/check-email', userController.email_verify)

router.get('/verify-email', userController.verify_email)

/**
 * GET / 
 * Log Out
 */
router.get('/logout', userController.logout)


/*********************************************************************************************************** */

/**
 * GET / 
 * Homepage
 */
router.get('/', isLoggedIn,userController.home_get)

/**
 * GET / 
 * Homepage IF LOGGED IN ??
 */
router.get('/home', isLoggedIn,userController.home_get)


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


module.exports = router;