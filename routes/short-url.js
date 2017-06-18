/* eslint no-console:0 */
const express = require('express');

const router = express.Router();

router.get('/:shortURL', (req, res) => {
  const longURL = 'https://www.facebook.com/';
  res.redirect(longURL);
});

module.exports = router;
