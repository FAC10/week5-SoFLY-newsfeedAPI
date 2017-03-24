const handler = require('./handler.js');
const _url = require('url');
const guardian = require('./api-calls/guardian.js');

const router = (req, res) => {
  const url = req.url;
  const pathname = _url.parse(url).pathname;

  const page = {
    '/' : 'index.html'
  }[url];

  const api = {
    '/search' : handler.search
  }[pathname];

  // ROUTES:
  if (page) {
    handler.serveStatic(req, res, page);

  } else if (api) {
    api(req, res);

  } else if (url.indexOf('/assets')===0) {
    handler.servePublic(req, res);

  } else {
    handler.serveError(req, res);

  }
};

module.exports = router;
