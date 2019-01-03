const express = require('express');
const router = express.Router();

const userController = require('../../controllers/usersControllers');

// @route   POST api/users/register
// @desc    Register user
// @accecss Public
router.post('/register', userController.postRegister);

// @route   POST api/users/login
// @desc    Login user / Returning JWT 
// @accecss Public
router.post('/login', userController.postLogin);

module.exports = router;