const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const adminLayout = './layouts/adminLayout'


/**
 * isLoggedIn middleware
 */

const isLoggedIn = (req,res,next) => {
	console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
		next()
	} else {
		return res.redirect('/admin/login')
	}
}


/***************************************************************************************************************** */

/**
 * GET / 
 * Log In
 */
router.get('/', isLoggedIn,adminController.homepage)

/**
 * GET / 
 * Log In
 */
router.get('/login', adminController.login_get)

/**
 * POST / 
 * Log In
 */
router.post('/login', adminController.login_post)

// /**
//  * GET / 
//  * Register
//  */
router.get('/register', adminController.register_get)

/**
 * POST / 
 * Register
 */
router.post('/register', adminController.register_post)

/**
 * GET / 
 * Log Out
 */
router.get('/logout', adminController.logout)


/**
 * GET / 
 * View Users
 */
router.get('/users', isLoggedIn,adminController.viewUsers)


/**
 * GET / 
 * View User Details
 */
router.get('/user/view/:id', adminController.viewUser)


router.get('/admin/*', (req,res) => {
    res.status(400).render('404', {
		layout: adminLayout
	})
})

module.exports = router;