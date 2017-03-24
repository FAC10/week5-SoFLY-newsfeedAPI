const fs = require('fs');
const path = require('path');
const _url = require('url');
const guardian = require('./api-calls/guardian.js');
const nyTimes = require('./api-calls/newyorktimes.js');
const parallel = require('./api-calls/parallel');
const handler = {};

handler.serveStatic = (request, response, page) => {
  const filePath = path.join(__dirname, '..', 'public', page);
  const readStream = fs.createReadStream(filePath);

  readStream.on('open', () => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    readStream.pipe(response);
  });
  readStream.on('error', (err) => {
    handler.serveError(request, response, err);
  });

};

handler.servePublic = (request, response) => {
  const url = request.url;
  const extension = url.split('.')[1];
  const extensionType = {
    'html': 'text',
    'css':'text/css',
    'js':'application/javascript',
    'ico':'image/x-icon'
  };
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', url));

  readStream.on('error', (err) => {
    handler.serveError(request, response, err);
  });
  readStream.on('open', () => {
    response.writeHead(200, {'Content-Type':extensionType[extension]});
    readStream.pipe(response);
  });

};

handler.search = (request, response) => {
  const url_parts = _url.parse(request.url, true);
  let searchQuery = url_parts.query;
  const arr = [];

  parallel([guardian.fetch, nyTimes.fetch], searchQuery.q, (err, apiResponseArray) => {
    if (err) {
      handler.serveError(request, response, err);
      return;
    }
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(apiResponseArray));
  });

};

handler.serveError = (request, response, err) => {
  if(err) console.log(err.message);
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found');

};
module.exports = handler;
