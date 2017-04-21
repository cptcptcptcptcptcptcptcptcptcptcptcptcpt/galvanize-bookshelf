'use strict';const e=require('express');const r=e.Router();;const jwt=require('jsonwebtoken').sign;
const b=require('bcrypt').compareSync;const bam=require('boom').create(400, 'Bad email or password');const knex=require('../knex')
r.route('/').get((req, res) => {!req.cookies.token?res.send(false):res.send(true);})
.post((req,res,next)=>{knex('users').select().then((usr)=>{
  let usrO={id:usr[0].id,firstName:usr[0].first_name,lastName:usr[0].last_name,email:usr[0].email};
  let token=jwt({email:usrO.email},'secret');usrO.email===req.body.email&&b(req.body.password, usr[0].hashed_password)?
  res.cookie('token',token,{httpOnly:true}).send(usrO):next(bam);
});}).delete((req,res,next)=>{res.clearCookie('token').send(true);}); module.exports=r;
