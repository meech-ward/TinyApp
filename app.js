/* eslint no-console:0 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const urlsRoute = require('./routes/urls');
const shortURLRoute = require('./routes/short-url');
const userAccountRoute = require('./routes/user-account');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.end('<html><body>Hello <b>World</b></body></html>\n');
});

app.use('/urls', urlsRoute);
app.use('/u', shortURLRoute);
app.use('/', userAccountRoute);

const PORT = process.env.PORT || 8080; // default port 8080
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
