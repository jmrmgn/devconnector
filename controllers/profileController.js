const errorHandler = require('../middleware/errorHandler').errorHandler;
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// Models
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
   try {
      const errors = {};

      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
      if (!profile) {
         errors.noprofile = 'There is no profile for this user';
         return res.status(404).json(errors);
      }
      else {
         res.json(profile);
      }      
   }
   catch (err) {
      res.status(404).json(err);
   }
}

exports.postProfile = async (req, res, next) => {

   const { errors, isValid } = validateProfileInput(req.body);

   // Check Validation
   if (!isValid) {
      res.status(400).json(errors);
   }

   // Get fields
   const profileFields = {};
   profileFields.user = req.user.id;
   if (req.body.handle) profileFields.handle = req.body.handle;
   if (req.body.company) profileFields.company = req.body.company;
   if (req.body.website) profileFields.website = req.body.website;
   if (req.body.location) profileFields.location = req.body.location;
   if (req.body.bio) profileFields.bio = req.body.bio;
   if (req.body.status) profileFields.status = req.body.status;
   if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

   // Skills - Split into array
   if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
   }

   // Social
   profileFields.social = {};
   if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
   if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
   if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
   if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
   if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

   try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
         // Update
         const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, useFindAndModify: false }
         );
         res.json(profile);
      }
      else {
         // Create

         // Check if handle exists
         const profile = await Profile.findOne({ handle: profileFields.handle });
         if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
         }
         
         // Save profile
         const newProfile = await new Profile(profileFields).save();
         res.json(newProfile);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);      
   }
   
}

exports.getProfileByHandle = async (req, res) => {
   try {
      const errors = {};
      const handle = req.params.handle;
      const profile = await Profile.findOne({ handle: handle }).populate('user', ['name', 'avatar'])
      if (!profile) {
         errors.noprofile = 'There is no profile for this user';
         res.status(404).json(errors);
      }
      else {
         res.json(profile);
      }
   }
   catch (err) {
      res.status(404).json(err);
   }
};

exports.getProfileByUserId = async (req, res) => {
   try {
      const errors = {};
      const userId = req.params.userId;
      const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar'])
      if (!profile) {
         errors.noprofile = 'There is no profile for this user';
         res.status(404).json(errors);
      }
      else {
         res.json(profile);
      }
   }
   catch (err) {
      res.status(404).json({ profile: 'There is no profile for this user' });
   }
};

exports.getProfiles = async (req, res) => {
   try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      if (!profiles) {
         errors.noprofile = 'There is no profiles';
         res.status(404).json(errors);
      }
      else {
         res.json(profiles);
      }
   }
   catch (err) {
      res.status(404).json({ profile: 'There are no profiles.' });
   }
};

exports.postExperience = async (req, res, next) => {
   try {
      const { errors, isValid } = validateExperienceInput(req.body);

      // Check Validation
      if (!isValid) {
         res.status(400).json(errors);
      }

      const user = req.user.id;
      const profile = await Profile.findOne({ user: user });
      const newExp = {
         title: req.body.title,
         company: req.body.company,
         location: req.body.location,
         from: req.body.from,
         to: req.body.to,
         current: req.body.current,
         description: req.body.description
      }

      if (profile) {
         profile.experience.unshift(newExp);
         const updatedProfile = await profile.save();
         res.json(updatedProfile);
      }
      else {
         throw errorHandler("Unauthorized", 401);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.postEducation = async (req, res, next) => {
   try {
      const { errors, isValid } = validateEducationInput(req.body);

      // Check Validation
      if (!isValid) {
         res.status(400).json(errors);
      }

      const user = req.user.id;
      const profile = await Profile.findOne({ user: user });
      const newEduc = {
         school: req.body.school,
         degree: req.body.degree,
         fieldofstudy: req.body.fieldofstudy,
         from: req.body.from,
         to: req.body.to,
         current: req.body.current,
         description: req.body.description
      }

      if (profile) {
         profile.education.unshift(newEduc);
         const updatedProfile = await profile.save();
         res.json(updatedProfile);
      }
      else {
         throw errorHandler("Unauthorized", 401);
      }
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deleteExperience = async (req, res, next) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
         // Get remove Index
         const removeIndex = profile.experience
         .map(item => item.id)
         .indexOf(req.params.exp_id);

         // Splice out of an array
         profile.experience.splice(removeIndex, 1);

         // save
         const updatedProfile = await profile.save();
         res.json(updatedProfile);
      }
      else {
         throw errorHandler("Unauthorized", 401);
      }
      
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deleteEducation = async (req, res, next) => {
   try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
         // Get remove Index
         const removeIndex = profile.education
         .map(item => item.id)
         .indexOf(req.params.educId);

         // Splice out of an array
         profile.education.splice(removeIndex, 1);

         // save
         const updatedProfile = await profile.save();
         res.json(updatedProfile);
      }
      else {
         throw errorHandler("Unauthorized", 401);
      }
      
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }
};

exports.deleteProfile = async (req, res, next) => {
   try {
      await Profile.findOneAndRemove({ user: req.user.id }, { useFindAndModify: false });
      await User.findOneAndRemove({ _id: req.user.id }, { useFindAndModify: false });
      res.json({ success: true });
   }
   catch (err) {
      (!err.statusCode) ? (err.statusCode = 500) : next(err);
   }

};