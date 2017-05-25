const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
const env = process.env.NODE_ENV || 'development';

mongoose.Promise = global.Promise;

if (env === 'development') {
  mongoose.connect('mongodb://localhost:27017/simpleblog_dev');
} else if (env === 'test') {
  mongoose.connect('mongodb://localhost:27017/simpleblog_test');
}

app.use(bodyParser.json());
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
  post.save((err, post) => {
    if (err) throw err;
    res.send(post);
  });
});

module.exports = app;
