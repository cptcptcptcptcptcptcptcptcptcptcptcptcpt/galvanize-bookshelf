'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex')
const humps = require('humps');
// YOUR CODE HERE
router.route('/')
  .get((req, res, next) => {
    knex('favorites')
      .innerJoin('books', 'favorites.book_id', 'books.id')
      .then((faves) => {
        console.log(faves);
      })
  })
// .post((req, res, next) => {
//
//
// })









module.exports = router;
