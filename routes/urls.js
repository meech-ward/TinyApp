/* eslint no-console:0 */
const express = require('express');
const database = require('../database');
const redirect = require('../redirect');

const router = express.Router();


function randomString() {
  return database.allURLs().then(urls => `short${Object.keys(urls).length}`);
}

function defaultTemplateVars(req) {
  return { user: { id: req.cookies.userId, username: 'username' } };
}

router.get('/', (req, res) => {
  database.allURLs().then((urls) => {
    const templateVars = defaultTemplateVars(req);
    templateVars.urls = urls;

    const userID = req.cookies.userId;

    database.getUser(userID)
    .then((user) => {
      templateVars.user = user;
      return templateVars;
    })
    .then((vars) => {
      res.render('urls_index', vars);
    })
    .catch(() => res.sendStatus(404));
  });
});

router.get('/json', (req, res) => {
  database.allURLs().then((urls) => {
    res.json(urls);
  });
});

router.get('/new', (req, res) => {
  res.render('urls_new', defaultTemplateVars(req));
});

router.post('/', (req, res) => {
  const longURL = req.body.longURL;
  randomString()
  .then(shortURL => database.addURL(longURL, shortURL))
  .then(() => {
    // Redirect to /urls
    redirect.redirectToURLs(res);
  });
});

router.get('/:id', (req, res) => {
  const urlID = req.params.id;

  database.allURLs().then((urls) => {
    if (!urls[urlID]) {
      return Promise.reject();
    }

    const templateVars = defaultTemplateVars(req);
    templateVars.url = { short: urlID, long: urls[urlID] };
    res.render('urls_show', templateVars);
  }).catch(() => res.sendStatus(404));
});

router.post('/:id', (req, res) => {
  const longURL = req.body.longURL;
  const urlID = req.params.id;

  database.modifyURL(urlID, longURL)
  .then((urls) => {
    if (!urls[urlID]) {
      return Promise.reject();
    }

    const templateVars = defaultTemplateVars(req);
    templateVars.url = { short: urlID, long: urls[urlID] };
    res.render('urls_show', templateVars);
  }).catch(() => res.sendStatus(404));
});

router.post('/:id/delete', (req, res) => {
  const urlID = req.params.id;

  database.deleteURL(urlID).then(() => {
    // Deleted
    redirect.redirectToURLs(res);
  }).catch(() => res.sendStatus(404));
});

module.exports = router;
