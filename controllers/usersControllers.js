const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

exports.getIndex = (req, res) => {
   res.send('Users index');
};

exports.postRegister = async (req, res) => {
   
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
         res.status(400).json({ msg: "Email already exists" });
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
      res.status(404).json({ msg: err });
   }
};

exports.postLogin = async (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   try {
      // Check user email
      const user = await User.findOne({ email: email });
      if (!user) {
         res.status(404).json({ msg: "User not found" });
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

            res.status(200).json({ msg: 'Success' });
         }
         else {
            res.status(422).json({ msg: 'Incorrect credentials' });
         }
      }
   }
   catch (err) {
      res.status(404).json({ msg: err });
   }
   
};