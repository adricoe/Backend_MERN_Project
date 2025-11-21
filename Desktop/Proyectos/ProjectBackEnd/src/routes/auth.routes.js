const router = require('express').Router();
const authController = require('../controllers/Auth.controller');

// registration and login routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;