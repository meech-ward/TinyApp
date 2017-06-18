
const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
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
