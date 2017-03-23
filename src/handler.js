var fs = require('fs');
var path = require('path');
var _url = require('url');
const guardian = require('./api-calls/guardian.js');
const nyTimes = require('./api-calls/newyorktimes.js');
var handler = module.exports = {};

handler.serveStatic = (request, response, page) => {
  const filePath = path.join(__dirname, '..', 'public', page);
  const readStream = fs.createReadStream(filePath);

  readStream.on('open', function(){
    response.writeHead(200, {'Content-Type': 'text/html'});
    readStream.pipe(response);
  });
  readStream.on('error', function(err){
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


  readStream.on('error', function(err){
    handler.serveError(request, response, err);
  });
  readStream.on('open', function(){
    response.writeHead(200, {'Content-Type':extensionType[extension]});
    readStream.pipe(response);
  });

};
handler.search = function (request, response) {

  response.writeHead(200, {'Content-Type': 'application/json'});
  var url_parts = _url.parse(request.url, true);
  var searchQuery = url_parts.query;
  var arr = [];
  guardian.fetch(searchQuery.q, function (err, res){
    arr.push(res);
    nyTimes.fetch(searchQuery.q, function(err, res){
      arr.push(res);
      response.end(JSON.stringify(arr));
    });
  });

};

handler.serveError = function (request, response, err) {
  if(err) console.log(err.message);
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found');

};
