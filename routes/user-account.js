/* eslint no-console:0 */
const express = require('express');
const redirect = require('../redirect');
const database = require('../database');

const router = express.Router();


router.post('/login', (req, res) => {
  const username = req.body.username;

  res.cookie('username', username);

  redirect.redirectToURLs(res);
});

router.post('/logout', (req, res) => {
  res.clearCookie('username');

  redirect.redirectToURLs(res);
});

router.get('/register', (req, res) => {
  res.render('user_register');
});

router.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == '' || password == '') {
    res.sendStatus(400);
  }

  database.saveUser(email, password)
  .then((user) => {
    res.cookie('user_id', user.id);
    redirect.redirectToURLs(res);
  })
  .catch(() => res.sendStatus(400));
});


module.exports = router;
