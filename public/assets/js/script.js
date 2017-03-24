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
      document.querySelector('.right').innerHTML = '';
      document.querySelector('.left').innerHTML = '';
      document.querySelector('.right').appendChild(noResults('us'));
      document.querySelector('.left').appendChild(noResults('uk'));
      return;
    }

    // New York Times
    if (res[1]) {
      // Reset article list
      document.querySelector('.right').innerHTML = '';
      // Build article list
      res[1].forEach(function (article) {
        appendToDom(buildArticleElement(article, true), true);
      });
    }

    // Guardian
    if (res[0]) {
      // Reset article list
      document.querySelector('.left').innerHTML = '';
      // Build article list
      res[0].forEach(function (article) {
        appendToDom(buildArticleElement(article, false), false);
      });
    }
  });
}

// build buffering image
function buildImage() {
  const img = document.createElement('img');

  img.src = '/assets/images/buffer.gif';
  img.alt = 'Articles currently loading';
  img.className = 'buffering';
  img.width = 50;

  return img;
}

// build no results div
function noResults(country) {
  const h2 = document.createElement('h2');
  h2.className = 'no-results';

  if (country === 'us') {
    h2.innerText = 'No results, try a different search.';
  } else {
    h2.innerText = 'Sorry, the search returned no results. Have a nice day.';
  }

  return h2;
}

// call on page load
getArticles('time');

// ****************************************************************************
// ----------------------------------------------------------------------------
// DOM STUFF BELOW HERE -------------------------------------------------------
// ----------------------------------------------------------------------------
// ****************************************************************************
document.getElementById('topic-search')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelector('.right').innerHTML = '';
    document.querySelector('.left').innerHTML = '';

    // Add buffering image
    document.querySelector('.right').appendChild(buildImage());
    document.querySelector('.left').appendChild(buildImage());

    // Add articles
    getArticles(e.target[0].value);
  });


function buildArticleElement(articleObj, us) {
  var link = document.createElement('a');
  link.href = articleObj.url;

  var article = document.createElement('article');
  article.className = 'article';

  var heading = document.createElement('h1');
  heading.className = 'article__header';
  heading.innerText = articleObj.title;

  var summary = document.createElement('p');
  summary.className = 'article__summary';
  summary.innerText = articleObj.summary;

  var thumbnail = document.createElement('div');
  thumbnail.className = 'article__thumbnail';
  thumbnail.style.backgroundImage = `url('${articleObj.thumbnail}')`;

  var flagstrip = document.createElement('div');
  flagstrip.className = 'article__flagstrip ' + (us ? 'us-strip' : 'uk-strip');

  [thumbnail, flagstrip, heading, summary].forEach(function (element) {
    article.appendChild(element);
  });

  link.appendChild(article);

  return link;
}

function appendToDom(article, right){
  var side = right ? document.querySelector('.right') :
                     document.querySelector('.left');
  side.appendChild(article);
}
