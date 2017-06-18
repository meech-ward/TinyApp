/* eslint no-console:0 */
const express = require('express');
const database = require('../database');

const router = express.Router();


function randomString() {
  return database.allURLs().then(urls => `short${Object.keys(urls).length}`);
}

function urlDatabaseViewModel() {
  const viewModel = [];
  return database.allURLs().then((urls) => {
    for (const key in urls) {
      const output = `${key}: ${urls[key]}`;
      viewModel.push(output);
    }
    return viewModel;
  });
}


router.get('/', (req, res) => {
  urlDatabaseViewModel().then((urls) => {
    const templateVars = { urls };
    res.render('urls_index', templateVars);
  });
});

router.get('/json', (req, res) => {
  database.allURLs().then((urls) => {
    res.json(urls);
  });
});

router.get('/new', (req, res) => {
  res.render('urls_new');
});

router.post('/', (req, res) => {
  const longURL = req.body.longURL;
  randomString()
  .then(shortURL => database.addURL(longURL, shortURL))
  .then(() => {
    // Redirect to /urls
    res.statusCode = 302;
    res.setHeader('Location', '/urls');
    res.end();
  });
});

router.get('/:id', (req, res) => {
  const urlID = req.params.id;

  database.allURLs().then((urls) => {
    if (!urls[urlID]) {
      return Promise.reject();
    }

    const templateVars = { url: { short: urlID, long: urls[urlID] } };
    res.render('urls_show', templateVars);
  }).catch(() => res.sendStatus(404));
});

module.exports = router;
