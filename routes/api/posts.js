const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../../controllers/postsController');

// @route   POST api/posts
// @desc    Create Post
// @accecss Private
router.post('/', passport.authenticate('jwt', { session: false }), postsController.postPost);

// @route   GET api/posts
// @desc    Get Posts
// @accecss Public
router.get('/', postsController.getPosts);

// @route   GET api/posts/postId
// @desc    Get single post
// @accecss Public
router.get('/:postId', postsController.getPost);

// @route   DELETE api/posts/postId
// @desc    Delete single post
// @accecss Private
router.delete('/:postId', passport.authenticate('jwt', { session: false }), postsController.deletePost);

// @route   POST api/posts/like/:postId
// @desc    Like post
// @accecss Private
router.post('/like/:postId', passport.authenticate('jwt', { session: false }), postsController.postLikePost);

// @route   POST api/posts/like/:postId
// @desc    Unlike post
// @accecss Private
router.post('/unlike/:postId', passport.authenticate('jwt', { session: false }), postsController.deleteLikePost);

module.exports = router;