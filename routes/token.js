'use strict';
const express = require('express');
const router = express.Router();
const humps = require('humps');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// let hashed_password = bcrypt.hashSync(pass, 10);

// let user = {
//   email : email,
//   hashed_password: hashed_password
// };

router.route('/')
  .get((req, res) => {
    req.cookies.token ? res.send(true) : res.send(false);

  })
  .post((req, res) => {
    let email = req.body.email;
    let pass = req.body.password;

    let token = jwt.sign({
      email: email
    }, 'secret');
    email && pass ? res.cookie('token', token) : res.sendStaus(400)
    knex('users')
      .where('email', email)
      .first()
      .then((user) => {
        if (user) {
          bcrypt.compare(pass, user.hashed_password, (err, result) => {
            if (err) {
              res.status(400).send('Bad email or password')
            }
            if (result) {
              let token = jwt.sign({
                email: user.email,
                password: user.hashed_password
              }, "shhhdonttell");
              res.cookie('token', token, {
                //Only available through HTTP Requests
                httpOnly: true
              })
            }
          })

        } else {

          }
        }).done()
  });
// res.status(200).send(user)


//   .where('email', email).then((user)=>{
//
// })
// .where(hashed_password, )
//   res.send( 'Bad email or password')
// })
// bcrypt.compare(pass, hashed_password, function(err, res) {
// res.cookie('token', token)
// console.log(user);

// if (!email || !passWord) {
//   next(boom.create(400, 'Bad email or password'));
// }
// knex('users')
//   .where('email', email)
//   .then(users => {
//     const user = users[0];
//     if(user){
//       bcrypt.compare(passWord, user.hashed_password, (err, result) => {
//         if (err) {
//           next(boom.create(400, 'Bad email or password'));
//         }
//         if (result) {
//           let token = jwt.sign({
//             email: user.email,
//             password: user.hashed_password
//           }, "kjbsldkfasldfkj");
//           res.cookie('token', token, {
//             httpOnly: true
//           });
//           delete user.hashed_password;
//           res.send(humps.camelizeKeys(user));
//         } else {
//           next(boom.create(400, 'Bad email or password'));
//         }
//       })
//     } else {
//       next(boom.create(400, 'Bad email or password'));
//     }
//   })


// YOUR CODE HERE

module.exports = router;
