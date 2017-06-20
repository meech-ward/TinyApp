/* eslint no-console:0 */
const express = require('express');
const redirect = require('../redirect');
const database = require('../database');

const router = express.Router();


router.post('/login', (req, res) => {
  const email = req.body.email;
  database.getUserWithEmail(email)
  .then((user) => {
    res.cookie('user_id', user.id);
    res.cookie('userId', user.id);

    redirect.redirectToURLs(res);
  })
  .catch(() => res.sendStatus(404));
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
