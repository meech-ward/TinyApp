
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
  console.log(`Long: ${JSON.stringify(longURL)}`);
  urlDatabase[shortURL] = longURL;
  return Promise.resolve('good');
}
exports.addURL = addURL;
