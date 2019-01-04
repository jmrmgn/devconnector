const errorHandler = require('../middleware/errorHandler').errorHandler;
const validatePostInput = require('../validation/post');

// Models
const Post = require('../models/Post');

exports.postPost = async (req, res, next) => {

   const { errors, isValid } = validatePostInput(req.body);

   // Check Validation
   if (!isValid) {
      res.status(400).json(errors);
   }

   const text = req.body.text;
   const name = req.body.name;
   const avatar = req.body.avatar;
   const user = req.user.id;

   try {
      const post = new Post({text, name, avatar, user});
      const newPost = await post.save();
      res.json(newPost);
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }

};