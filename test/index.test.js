const test = require('ava');
const request = require('supertest');
const app = require('../app');

test('index', async t => {
  const res = await request(app).get('/');

  t.is(res.status, 200);
  t.is(res.text, 'Hello World');
});
