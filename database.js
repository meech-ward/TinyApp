const shortid = require('shortid');

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

const userDatabase = {
  userRandomID: {
    id: 'userRandomID',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur',
  },
  user2RandomID: {
    id: 'user2RandomID',
    email: 'user2@example.com',
    password: 'dishwasher-funk',
  },
};

function allURLs() {
  return new Promise((resolve, reject) => {
    resolve(urlDatabase);
  });
}
exports.allURLs = allURLs;

function addURL(longURL, shortURL) {
  urlDatabase[shortURL] = longURL;
  return Promise.resolve('good');
}
exports.addURL = addURL;

function deleteURL(shortURL) {
  delete urlDatabase[shortURL];
  return Promise.resolve('good');
}
exports.deleteURL = deleteURL;

function modifyURL(urlID, longURL) {
  urlDatabase[urlID] = longURL;
  return allURLs();
}
exports.modifyURL = modifyURL;

/**
 * Create or update a user in the database.
 * @param {* The user's email address} email
 * @param {* The plain text password} password
 * @param {* The ID of the user to update, Null to create a new user} userID
 */
function saveUser(email, password, _userID) {
  let userID = _userID;
  if (!userID) {
    userID = shortid.generate();
  }

  const user = {
    id: userID,
    email,
    password,
  };

  userDatabase[userID] = user;

  console.log(`UserDatabase: ${JSON.stringify(userDatabase)}`);

  delete user.password;
  return Promise.resolve(user);
}
exports.saveUser = saveUser;

function getUser(userID) {
  const user = userDatabase[userID];

  delete user.password;
  return Promise.resolve(user);
}
exports.getUser = getUser;
