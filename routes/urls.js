const express = require('express');

const router = express.Router();

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

router.get('/json', (req, res) => {
  res.json(urlDatabase);
});

router.get('/', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

router.get('/:id', (req, res) => {
  const templateVars = { shortURL: req.params.id };
  res.render('urls_index', templateVars);
});

module.exports = router;
