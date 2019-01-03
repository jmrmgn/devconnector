const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../controllers/usersControllers');

// @route   POST api/users/register
// @desc    Register user
// @accecss Public
router.post('/register', userController.postRegister);

// @route   POST api/users/login
// @desc    Login user / Returning JWT 
// @accecss Public
router.post('/login', userController.postLogin);

// @route   GET api/users/current
// @desc    Return current user 
// @accecss Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
   res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
   });
});

module.exports = router;