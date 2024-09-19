const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  // Liking to be added eventually.
  // likes: {
  //   type: Number,
  //   required: true,
  // },
  user: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);