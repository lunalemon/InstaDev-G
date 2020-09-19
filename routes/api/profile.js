const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const mongoose = require("mongoose");
const User = require("../../models/User");
const { ObjectId } = require("mongoose");
const validateProfileInput = require("../../validation/profile");

// @route POST /api/profile/
// @desc Create or Edit your Profile
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.profile_image)
      profileFields.profile_image = req.body.profile_image;
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          //update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => res.json(profile))
            .catch((err) => console.log(err));
        } else {
          //create
          Profile.findOne({ handle: profileFields.handle })
            .then((profile) => {
              if (profile) {
                return res
                  .status(400)
                  .json({ handle: "That handle already exists!" });
              }

              new Profile(profileFields)
                .save()
                .then((profile) => res.json(profile));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
);

// @route /api/profile/user/follow
// @desc API to update the follower and following
// @access Private

router.put(
  "/follow",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate(
      { user: req.body.user_id },
      {
        $addToSet: { followers: req.user.id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(421).json({ error: err });
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $addToSet: { following: req.body.user_id } },

          {
            new: true,
          }
        )
          .then((profile) => res.json(profile))

          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  }
);

// @route /api/profile/user/unfollow
// @desc API to update the follower and following
// @access Private

router.put(
  "/unfollow",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate(
      { user: req.body.user_id },
      {
        $pull: { followers: req.user.id },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(421).json({ error: err });
        }
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $pull: { following: req.body.user_id } },

          {
            new: true,
          }
        )
          .then((profile) => res.json(profile))

          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  }
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar", "email"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar", "email"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  const userid = req.params.user_id;
  console.log(userid);
  Profile.findOne({ user: userid })
    .populate("user", ["name", "avatar", "email"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(403).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => console.log(err));
});

// @route /api/profile/follower
// @desc Get all list of followers of the user
// @access private

router.get(
  "/follower",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(async (profile) => {
        if (!profile) {
          errors.nofollower = "No followers for this user";
          return res.status(404).json(errors);
        } else {
          const allfollowers = profile.followers;
          const followersnames = [];

          for (let i = 0; i < allfollowers.length; i++) {
            await User.findOne({ _id: allfollowers[i] })
              .then((profile) => {
                const follower = {
                  name: profile.name,
                  id: profile._id,
                  avatar: profile.avatar,
                };
                followersnames.push(follower);
                console.log(follower);
              })
              .catch((err) => console.log(err));
          }
          console.log("after for", followersnames);
          res.json(followersnames);
        }
      })

      .catch((err) => console.log(err));
  }
);

// @route /api/profile/following
// @desc Get all the following members of the user
// @access private

router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(async (profile) => {
        if (!profile) {
          errors.nofollower = "No followers for this user";
          return res.status(404).json(errors);
        } else {
          const allfollowing = profile.following;
          const followingnames = [];

          for (let i = 0; i < allfollowing.length; i++) {
            await User.findOne({ _id: allfollowing[i] })
              .then((profile) => {
                const following = {
                  name: profile.name,
                  id: profile._id,
                  avatar: profile.avatar,
                };
                followingnames.push(following);
                console.log(following);
              })
              .catch((err) => console.log(err));
          }
          console.log("after for", followingnames);
          res.json(followingnames);
        }
      })

      .catch((err) => console.log(err));
  }
);

module.exports = router;
