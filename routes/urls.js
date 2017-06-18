const express = require('express');

const router = express.Router();

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

const urlDatabaseViewModel = [];
for (const key in urlDatabase) {
  const output = `${key}: ${urlDatabase[key]}`;
  urlDatabaseViewModel.push(output);
}


router.get('/', (req, res) => {
  const templateVars = { urls: urlDatabaseViewModel };
  res.render('urls_index', templateVars);
});

router.get('/json', (req, res) => {
  res.json(urlDatabase);
});

router.get('/new', (req, res) => {
  res.render('urls_new');
});

router.post('/', (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send('Ok');         // Respond with 'Ok' (we will replace this)
});

router.get('/:id', (req, res) => {
  const urlID = req.params.id;

  if (!urlDatabase[urlID]) {
    res.sendStatus(404);
    return;
  }

  const templateVars = { url: { short: urlID, long: urlDatabase[urlID] } };
  res.render('urls_show', templateVars);
});

module.exports = router;
