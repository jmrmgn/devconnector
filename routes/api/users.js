const express = require('express');
const router = express.Router();

const userController = require('../../controllers/usersControllers');

// @route   GET api/users
// @desc    Get index of the users
// @accecss Public
router.get('/', userController.getIndex);

module.exports = router;