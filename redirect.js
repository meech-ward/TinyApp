
function redirectToURLs(res) {
  res.statusCode = 302;
  res.setHeader('Location', '/urls');
  res.end();
}
exports.redirectToURLs = redirectToURLs;