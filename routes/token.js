'use strict';
const express = require('express');
const r = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt').compareSync;
const jwt = require('jsonwebtoken').sign;
const bam = require('boom').create(400, 'Bad email or password');
r.route('/')
.get((req, res, next) => {!req.cookies.token ? res.send(false) : res.send(true);})
.post((req, res, next) => {
  knex('users').select().then((usr) => {
    let usrO = { id:usr[0].id, firstName:usr[0].first_name, lastName:usr[0].last_name, email:usr[0].email };
    let token = jwt({ email: usrO.email }, 'secret');
    usrO.email===req.body.email&&bcrypt(req.body.password, usr[0].hashed_password)?res.cookie('token', token, {httpOnly:true}).send(usrO):next(bam);
  })
}).delete((req, res, next) => {
  res.clearCookie('token');
  res.send(true)
});
module.exports = r;
