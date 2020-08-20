const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const usersSchema = new Schema({
  userId: {
    type: Number,
    required: false
  },
  userName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

const users = mongoose.model('User', usersSchema);

module.exports = users;
