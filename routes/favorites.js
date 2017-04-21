'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps').camelizeKeys;
const bam = require('boom').create(401, 'Unauthorized');

router.route('/')
  .get((req, res, next) => {
    knex('favorites').join('books', 'books.id', 'book_id').then((g) => {
      !req.cookies.token ? next(bam) : res.send(humps(g))
    })
  }).post((req, res, next) => {
    knex('favorites').returning(['id', 'book_id', 'user_id']).insert({
      book_id: req.body.bookId,
      user_id: 1
    }).then((p) => {
      !req.cookies.token ? next(bam) : res.send(humps(p[0]))
    })
  }).delete((req, res, next) => {
    !req.cookies.token ? next(bam) :
      knex('favorites').where('book_id', req.body.bookId).returning(['book_id', 'user_id']).del().then((rm) => {
        res.send(humps(rm[0]))
      })
  })
router.route('/check').get((req, res, next) => {
  !req.cookies.token ? (req.query.bookId == 1 ? next(bam) : next(bam)) : (req.query.bookId == 1 ? res.send(true) : res.send(false));
})
module.exports = router;
