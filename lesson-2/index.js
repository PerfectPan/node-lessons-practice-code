const express = require('express');
const util = require('utility');

const app = express();

app.get('/', (req, res) => {
  const q = req.query.q;
  const md5Value = q ? util.md5(q) : '';
  const sha1Value = q ? util.sha1(q) : '';
  res.send(`md5: ${md5Value} sha1: ${sha1Value}`);
});

app.listen(3000, (req, res) => {
  console.log('App is running at port 3000');
});