'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  subject: String,
  content: String,
  created: { type: Date, default: Date.now }
});

const User = mongoose.model('Post', postSchema);

module.exports = User;
