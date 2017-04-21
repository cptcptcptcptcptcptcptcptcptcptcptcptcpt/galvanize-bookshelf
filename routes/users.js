'use strict';
const express = require('express');
const r = express.Router();
const knex = require('../knex');
const h = require('humps').camelizeKeys;
const b = require('bcrypt').hashSync;
r.route('/').post((req, res) => { knex('users').returning(['id','first_name','last_name','email']).insert({
  first_name:req.body.firstName,last_name:req.body.lastName,email:req.body.email,hashed_password:b(req.body.password, 1),
  created_at:new Date(),updated_at:new Date()}).then((usr)=>{res.send(h(usr[0]));});
}); module.exports = r;
