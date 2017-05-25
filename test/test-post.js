const test = require('ava');
const request = require('supertest');
const app = require('../app');
const Post = require('../models/post');

const _post = {
  subject: 'subject',
  content: 'content'
};

test('Create post', async t => {
  t.plan(3);

  const res = await request(app).post('/posts').send(_post);

  t.is(res.status, 200);
  t.is(res.body.subject, 'subject');
  t.is(res.body.content, 'content');
});

test.after('Clean up', () => {
  Post.remove(err => {
    if (err) throw err;
  });
});
