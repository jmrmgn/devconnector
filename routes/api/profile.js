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

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public
router.get('/all', profileController.getProfiles);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', profileController.getProfileByHandle);

// @route   GET api/profile/user/:id
// @desc    Get profile by id
// @access  Public
router.get('/user/:userId', profileController.getProfileByUserId);



module.exports = router;