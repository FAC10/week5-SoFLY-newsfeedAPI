var handler = require('./handler.js');

module.exports = function(request, response){
  var url = request.url;
  console.log(url);
  var page = {
    '/' : 'index.html'
    //ADD PAGES HERE
  }[url];

  if (page) {
    handler.serveStatic(request, response, page);
  }

  else if (url.indexOf('/assets') === 0) {
    handler.servePublic(request, response);

  }

  else {
    handler.serveError(request, response);

  }
};
