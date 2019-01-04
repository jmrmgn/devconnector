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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), profileController.postExperience);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), profileController.postEducation);

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:expId', passport.authenticate('jwt', { session: false }), profileController.deleteExperience);

// @route   DELETE api/profile/educataion/:educId
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:educId', passport.authenticate('jwt', { session: false }), profileController.deleteEducation);

// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), profileController.deleteProfile);


module.exports = router;