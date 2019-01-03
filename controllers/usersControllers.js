const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const errorHandler = require('../middleware/errorHandler').errorHandler;

const User = require('../models/User');

exports.postRegister = async (req, res, next) => {
   
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;
   const avatar = gravatar.url(email, {
      s: 200, // Size
      r: 'pg', // Rating
      d: 'mm' // Default
   });
   
   try {
      const user = await User.findOne({ email: email });
      if (user) {
         throw errorHandler("Email already exist.", 400);
      }
      else {
         // Password hash
         const hashPw = await bcrypt.hash(password, 12);

         const newUser = await new User({
            name: name,
            email: email,
            avatar: avatar,
            password: hashPw
         });

         await newUser.save();
         res.status(201).json(newUser);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.postLogin = async (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   try {
      // Check user email
      const user = await User.findOne({ email: email });
      if (!user) {
         throw errorHandler('User not found!', 401);
      }
      else {
         const isMatch = await bcrypt.compare(password, user.password);
         if (isMatch) {
            // Create jwt payload
            const payload = {
               id: user._id,
               name: user.name,
               avatar: user.avatar
            };

            // Signing the token
            const token = await jwt.sign(payload, keys.secret, { expiresIn: 3600 });
            res.json({ success: true, token: 'Bearer ' + token });
         }
         else {
            throw errorHandler('Wrong password!', 401);
         }
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
   
};