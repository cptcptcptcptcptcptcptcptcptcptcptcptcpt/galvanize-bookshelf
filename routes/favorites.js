'use strict';
const e = require('express');
const r = e.Router();
const k = require('../knex');
const h = require('humps').camelizeKeys;
const bam = require('boom').create(401, 'Unauthorized');
r.route('/').get((req, res, next) => {
    k('favorites').join('books', 'books.id', 'book_id').then((g) => {
      !req.cookies.token ? next(bam) :
        res.send(h(g));
    });
  }).post((req, res, next) => {
    k('favorites').returning(['id', 'book_id', 'user_id'])
      .insert({
        book_id: req.body.bookId,
        user_id: 1
      }).then((p) => {
        !req.cookies.token ? next(bam) : res.send(h(p[0]));
      });
  })
  .delete((req, res, next) => {
    !req.cookies.token ? next(bam) : k('favorites').where('book_id', req.body.bookId)
      .returning(['book_id', 'user_id']).del().then((rm) => {
        res.send(h(rm[0]));
      });
  });
r.route('/check').get((req, res, next) => {
  !req.cookies.token ? (req.query.bookId == 1 ? next(bam) : next(bam)) :
    (req.query.bookId == 1 ? res.send(true) : res.send(false));
});
module.exports = r;
