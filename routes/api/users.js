const express = require('express');
const router = express.Router();

const userController = require('../../controllers/usersControllers');

// @route   GET api/users
// @desc    Get index of the users
// @accecss Public
router.get('/', userController.getIndex);

// @route   POST api/users/register
// @desc    Register user
// @accecss Public
router.post('/register', userController.postRegister);

module.exports = router;