'use strict';
const express = require('express');
const r = express.Router();
const knex = require('../knex');
const h = require('humps');
r.route('/')
.get((req,res)=>{knex('books').orderBy('title','asc').then((demBooks)=>{res.send(h.camelizeKeys(demBooks)); });})
.post((req,res)=>{knex('books').returning(['id','title','author','genre','description','cover_url'])
    .insert(h.decamelizeKeys(req.body)).then((book) => { res.send(h.camelizeKeys(book[0])); }); });
r.route('/:id')
.get((req,res)=>{knex('books').where('id',req.params.id).then((book)=>{res.send(h.camelizeKeys(book[0])); })})
.patch((req,res)=>{knex('books').where('id',req.params.id).returning(['id','title','author','genre','description','cover_url'])
    .update(h.decamelizeKeys(req.body)).then((book) => { res.send(h.camelizeKeys(book[0])); });})
.delete((req,res)=>{knex('books').where('id',req.params.id).returning(['title','author','genre','description','cover_url'])
    .del().then((book) => { res.send(h.camelizeKeys(book[0])); });
}); module.exports = r;
