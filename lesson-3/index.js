const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res, next) => {
  superagent
    .get('https://cnodejs.org/')
    .end((err, sres) => {
      if (err) {
        return next(err);
      }
      const $ = cheerio.load(sres.text);
      const items = [];
      $('#topic_list .topic_title').each((idx, element) => {
        const $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: `https://cnodejs.org/${$element.attr('href')}`,
        })
      });
      $('#topic_list .user_avatar').each((idx, element) => {
        const $element = $(element);
        Object.assign(items[idx], {
          author: $element.attr('href').match(/\/user\/(.*)/)[1],
        });
      })
      // 防止中文乱码
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(JSON.stringify(items));
    });
});

app.listen(3000, () => {
  console.log('App is listening at 3000.');
});