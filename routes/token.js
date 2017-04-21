'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt').compareSync;
const jwt = require('jsonwebtoken').sign;
const bam = require('boom').create(400, 'Bad email or password');
router.route('/').get((req, res, next) => {
  !req.cookies.token ? res.status(200).send(false) : res.status(200).send(true);
}).post((req, res, next) => {
  let email = req.body.email;
  let pass = req.body.password;
  knex('users').select().then((usr) => {
    let usrO = {
      id: usr[0].id,
      firstName: usr[0].first_name,
      lastName: usr[0].last_name,
      email: usr[0].email
    };
    let p = usr[0].hashed_password;
    let e = usrO.email;
    let token = jwt({
      email: e
    }, 'secret');
    e === email && bcrypt(pass, p) ? res.cookie('token', token, {
      httpOnly: true
    }).send(usrO) : next(bam);
  })
}).delete((req, res, next) => {
  res.clearCookie('token');
  res.status(200).send(true)
});
module.exports = router;
