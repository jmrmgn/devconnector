const express = require('express');
const router = express.Router();

const postsController = require('../../controllers/postsController');

// @route   GET api/posts
// @desc    Get index of the posts
// @accecss Public
router.get('/', postsController.getIndex);

module.exports = router;