const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postsSchema = new Schema({
  postId: {
    type: Number,
    required: false
  },
  postTitle: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: false,
  },
  postedDate: {
    type: String,
    required: false,
  },
  postedOwner: {
    type: String,
    required: true
  }
});

const posts = mongoose.model('Post', postsSchema);

module.exports = posts;
