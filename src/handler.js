var fs = require('fs');
var path = require('path');

var handler = module.exports = {};

handler.serveStatic = function (request, response, page) {
  fs.readFile(path.join(__dirname, '..', 'public', page), function (err, file) {
    if (err) throw err;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(file);
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

  fs.readFile(path.join(__dirname, '..', 'public', url), function(error, file){
    if(error||url.includes('..')){
      handler.serveError(request, response);
      return;
    }
    response.writeHead(200, {'Content-Type':extensionType[extension]});
    response.end(file);
  });

};

handler.serveError = function (request, response) {
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found');
};
