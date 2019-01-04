const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../../controllers/postsController');

// @route   POST api/posts
// @desc    Create Post
// @accecss Private
router.post('/', passport.authenticate('jwt', { session: false }), postsController.postPost);

module.exports = router;