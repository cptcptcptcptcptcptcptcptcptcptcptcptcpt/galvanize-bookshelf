'use strict';
const e = require('express');
const r = e.Router();
const k = require('../knex');
const h = require('humps').camelizeKeys;
const b = require('bcrypt').hashSync;
r.route('/').post((req, res) => {
  k('users').returning(['id', 'first_name', 'last_name', 'email']).insert({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    hashed_password: b(req.body.password, 1),
    created_at: new Date(),
    updated_at: new Date()
  }).then((usr) => {
    res.send(h(usr[0]));
  });
});
module.exports = r;
