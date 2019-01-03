const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../../controllers/profileController');

// @route   GET api/profile
// @desc    Get current users profile
// @accecss Private
router.get('/', passport.authenticate('jwt', { session: false }), profileController.getProfile);

// @route   POST api/profile
// @desc    Create or Update user profile
// @accecss Private
router.post('/', passport.authenticate('jwt', { session: false }), profileController.postProfile);


module.exports = router;