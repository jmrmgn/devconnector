const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../../controllers/profileController');

// @route   GET api/profile
// @desc    Get current users profile
// @accecss Private
router.get('/', passport.authenticate('jwt', { session: false }), profileController.getProfile);

module.exports = router;