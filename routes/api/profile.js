const express = require('express');
const router = express.Router();

const profileController = require('../../controllers/profileController');

// @route   GET api/profile
// @desc    Get index of the profile
// @accecss Public
router.get('/', profileController.getIndex);

module.exports = router;