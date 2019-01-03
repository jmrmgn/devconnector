const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const User = require('../models/User');

exports.getIndex = (req, res) => {
   res.send('Users index');
};

exports.postRegister = async (req, res) => {
   
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.email;
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

   }
};