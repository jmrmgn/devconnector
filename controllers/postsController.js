const errorHandler = require('../middleware/errorHandler').errorHandler;
const validatePostInput = require('../validation/post');

// Models
const Post = require('../models/Post');
const Profile = require('../models/Profile');

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

exports.getPosts = async (req, res, next) => {
   try {
      const posts = await Post.find().sort({ date: "-1" });
      res.json(posts);

   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.getPost = async (req, res, next) => {
   const postId = req.params.postId;
   try {
      const post = await Post.findOne({ _id: postId }).exec();
      if (!post) {
         throw errorHandler("Post doesn't exist", 404);
      }
      else {
         res.json(post);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deletePost = async (req, res, next) => {
   try {
      // const profile = await Profile.findOne({ user: req.user.id }).exec();
      const post = await Post.findOne({ _id: req.params.postId }).exec();
      if (!post) {
         throw errorHandler("No post found", 404);
      }
      else {
         if (post.user.toString() !== req.user.id) {
            throw errorHandler("Unauthorized", 401);
         }
         else {
            await post.remove();
            res.json({ success: true });
         }
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};
