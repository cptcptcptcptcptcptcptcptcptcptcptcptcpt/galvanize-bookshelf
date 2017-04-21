'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const humps = require('humps').camelizeKeys;
const bcrypt = require('bcrypt').hashSync;

router.route('/').post((req, res) => {
  knex('users').returning(['id', 'first_name', 'last_name', 'email'])
    .insert({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      hashed_password: bcrypt(req.body.password, 1),
      created_at: new Date(),
      updated_at: new Date()
    }).then((usr) => {
      res.send(humps(usr[0]));
    });
})
module.exports = router;
