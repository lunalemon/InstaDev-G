const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  phone: {
    type: Number,
  },

  handle: {
    type: String,
    required: true,
    max: 40,
  },

  website: {
    type: String,
  },

  bio: {
    type: String,
  },

  profile_image: {
    type: String,
  },

  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
