const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = express();
const db = mongoose.createConnection('mongodb://localhost:27017/simpleblog');

const postSchema = new mongoose.Schema({
  subject: String,
  content: String,
  created: { type: Date, default: Date.now }
});

const Post = db.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/posts', (req, res) => {
  Post.find({}).exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(posts);
    }
  });
});

app.post('/posts', (req, res) => {
  const post = new Post({
    subject: req.body.subject,
    content: req.body.content
  });
  post.save();

  res.redirect('/posts');
});

module.exports = app;
