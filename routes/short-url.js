/* eslint no-console:0 */
const express = require('express');
const database = require('../database');

const router = express.Router();

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  database.allURLs().then((urls) => {
    const url = urls[shortURL];
    if (!url) {
      return Promise.reject();
    }

    res.redirect(url);
  })
  .catch(() => res.json({ error: `error getting url with short url ${shortURL}` }));
});

module.exports = router;
