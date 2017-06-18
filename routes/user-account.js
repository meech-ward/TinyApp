/* eslint no-console:0 */
const express = require('express');
const redirect = require('../redirect');

const router = express.Router();


router.post('/login', (req, res) => {
  const username = req.body.username;

  res.cookie('username', username);

  redirect.redirectToURLs(res);
});

module.exports = router;
