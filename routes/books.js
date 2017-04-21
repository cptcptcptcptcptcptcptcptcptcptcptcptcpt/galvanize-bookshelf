'use strict';const e=require('express');const r=e.Router();const k=require('../knex');const h=require('humps');
r.route('/').get((req,res)=>{k('books').orderBy('title','asc').then((demBooks)=>{res.send(h.camelizeKeys(demBooks)); });})
.post((req,res)=>{k('books').returning(['id','title','author','genre','description','cover_url'])
    .insert(h.decamelizeKeys(req.body)).then((book)=>{res.send(h.camelizeKeys(book[0]));});});
r.route('/:id').get((req,res)=>{k('books').where('id',req.params.id).then((book)=>{res.send(h.camelizeKeys(book[0])); })})
.patch((req,res)=>{k('books').where('id',req.params.id).returning(['id','title','author','genre','description','cover_url'])
    .update(h.decamelizeKeys(req.body)).then((book) => { res.send(h.camelizeKeys(book[0]));});})
.delete((req,res)=>{k('books').where('id',req.params.id).returning(['title','author','genre','description','cover_url'])
    .del().then((book) => { res.send(h.camelizeKeys(book[0])); });}); module.exports = r;
