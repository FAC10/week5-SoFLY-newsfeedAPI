console.log('Hi, its working');
var fetch = function(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        cb(true);
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

fetch( 'https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=c0f475f6de2d42998de013309ad9d70b', console.log)
