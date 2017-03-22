var fs = require('fs');
var path = require('path');

var handler = module.exports = {};

handler.serveStatic = function (request, response, page) {
  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', page));

  readStream.on('open', function(){
    response.writeHead(200, {'Content-Type': 'text/html'});
    readStream.pipe(response);
  });
  readStream.on('error', function(err){
    handler.serveError(err);
  });
};


handler.servePublic = function(request, response){
  var url = request.url;
  var extension = url.split('.')[1];
  var extensionType = {
    'html': 'text',
    'css':'text/css',
    'js':'application/javascript',
    'ico':'image/x-icon'
  };

  const readStream = fs.createReadStream(path.join(__dirname, '..', 'public', url));

  readStream.on('open', function(){
    response.writeHead(200, {'Content-Type':extensionType[extension]});
    readStream.pipe(response);
  });
  readStream.on('error', function(err){
    handler.serveError(err);
  });


};

handler.serveError = function (request, response) {
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found');
};
