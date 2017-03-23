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

function getArticles (searchterm) {
  fetch('/search?q=' + searchterm, (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }

    // Reset article list
    document.querySelector('.left').innerHTML = '';
    document.querySelector('.right').innerHTML = '';

    // New York Times
    if (res[1]) {
      res[1].forEach(function (article) {
        buildArticle(article, true);
      });
    }

    // Guardian
    if (res[0]) {
      res[0].forEach(function (article) {
        buildArticle(article, false);
      });
    }
  });
}

// call on page load
getArticles('brexit');


// ****************************************************************************
// ----------------------------------------------------------------------------
// DOM STUFF BELOW HERE -------------------------------------------------------
// ----------------------------------------------------------------------------
// ****************************************************************************
document.getElementById('topic-search')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    document.querySelector('.left').innerHTML = '';
    document.querySelector('.right').innerHTML = '';
    getArticles(e.target[0].value);
  });


function buildArticle(articleObj, right) {
  var link = document.createElement('a');

  var article = document.createElement('article');
  article.className = 'article';

  var heading = document.createElement('h1');
  heading.className = 'article__heading';
  heading.innerText = articleObj.title;

  var summary = document.createElement('p');
  summary.className = 'article__summary';
  summary.innerText = articleObj.summary;

  var thumbnail = document.createElement('div');
  thumbnail.className = 'article__thumbnail';
  thumbnail.style.backgroundImage = `url('${articleObj.thumbnail}')`;



  [thumbnail, heading, summary].forEach(function (element) {
    article.appendChild(element);
  });

  var side = right ? document.querySelector('.right') :
                     document.querySelector('.left');

  side.appendChild(article);
}
