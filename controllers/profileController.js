// Models
const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
   try {
      const errors = {};

      const profile = await Profile.findOne({ user: req.user.id });
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

exports.postProfile = async (req, res) => {
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
         const profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
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
      res.status(404).json(err);
   }
   
}