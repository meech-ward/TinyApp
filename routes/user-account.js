/* eslint no-console:0 */
const express = require('express');
const redirect = require('../redirect');
const database = require('../database');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user_login');
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  database.getUserWithEmail(email)
  .then((user) => {
    if (user.password !== password) {
      return Promise.reject(403);
    }

    res.cookie('userId', user.id);

    redirect.redirectToURLs(res);
  })
  .catch(() => res.sendStatus(403));
});

router.post('/logout', (req, res) => {
  res.clearCookie('userId');

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
    res.cookie('userId', user.id);
    redirect.redirectToURLs(res);
  })
  .catch(() => res.sendStatus(400));
});


module.exports = router;
