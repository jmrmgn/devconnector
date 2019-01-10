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
   else {
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

exports.postLikePost = async (req, res, next) => {
   try {
      // const profile = await Profile.findOne({ user: req.user.id }).exec();
      const post = await Post.findById({ _id: req.params.postId });
      if (post) {
         if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            throw errorHandler("User already liked this post", 400);
         }
         else {
            post.likes.unshift({ user: req.user.id });
            await post.save();
            res.json({ success: true });
         }
      }
      else {
         throw errorHandler("No post found", 404);
      }

   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deleteLikePost = async (req, res, next) => {
   try {
      // const profile = await Profile.findOne({ user: req.user.id }).exec();
      const post = await Post.findById({ _id: req.params.postId });
      if (post) {
         if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            throw errorHandler("You have not yet liked this post", 400);
         }
         else {
            const removeIndex = post.likes
               .map(item => item.user.toString())
               .indexOf(req.user.id);
            
            post.likes.splice(removeIndex, 1);
            await post.save();
            res.json(post);
         }
      }
      else {
         throw errorHandler("No post found", 404);
      }

   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.postComment = async (req, res, next) => {
   try {

      const { errors, isValid } = validatePostInput(req.body);

      // Check Validation
      if (!isValid) {
         res.status(400).json(errors);
      }
      else {
         const post = await Post.findById(req.params.postId);
         if (post) {
            const newComment = {
               text: req.body.text,
               name: req.body.name,
               avatar: req.body.avatar,
               user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();
            res.json(post);
         }
         else {
            throw errorHandler("No post found", 404);
         }
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deleteComment = async (req, res, next) => {
   try {
      const post = await Post.findById(req.params.postId);
      if (post) {
         // Check first if the comment exist
         if (post.comments.filter(comment => comment._id.toString() === req.params.commentId).length === 0) {
            throw errorHandler("Comment doesnt exist", 404);
         }
         else {
            // Get remove index
            const removeIndex = post.comments
               .map(item => item._id.toString())
               .indexOf(req.params.commentId);
            
            // Splice comment out of array
            post.comments.splice(removeIndex, 1);
            await post.save();
            res.json(post);
         }
      }
      else {
         throw errorHandler("No post found", 404);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};