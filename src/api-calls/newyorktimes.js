const env = require('env2')('./.env');
const request = require('request');
const nyTimes = module.exports = {};




/**
 * Builds an article object with 4 key:value pairs
 * @param  {object} apiObj nyTimes API
 * @return {object} or null if value not found
 */
nyTimes.buildArticle = (apiObj) => {
  const article = {};
  if (apiObj.headline && apiObj.headline.main) {
    article.title = apiObj.headline.main;
  }
  if (apiObj.web_url) {
    article.url = apiObj.web_url;
  }
  if (apiObj.snippet) {
    article.summary = apiObj.snippet;
  }
  if (apiObj.multimedia && apiObj.multimedia[1] && apiObj.multimedia[1].url) {
    article.thumbnail = 'http://www.nytimes.com/' + apiObj.multimedia[1].url;
  }

  return Object.keys(article).length === 4 ?
  article :
  null;
};

/**
 * Parses data from the nyTimes API @TODO add tests
 * @param  {string} searchterm
 * @param  {Function} callback
 */
nyTimes.parseApiData = (articles, callback) => {
  const output = [];
  //
  if (articles.response && articles.response.docs) {
    articles.response.docs.forEach(e => {
      if (output.length < 5) {
        const article = nyTimes.buildArticle(e);
        if (article) {
          output.push(article);
        }
      }
    });
  }
  if (output.length) {
    callback(null, output);
  } else {
    callback(new Error('No search results'));
  }
};

/**
 * Makes an http get request to the nyTimes API.
 * CODE NOT TESTED: uses external resources.
 * @param  {string}   searchterm
 * @param  {Function} callback
 */
nyTimes.fetch = (searchterm, callback) => {
  const address = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
  const apiKey = process.env.nytimes_api;
  const url = address + searchterm + apiKey;

  request(url, (err, response, body) => {
    if (err) {
      callback(err);
      return;
    }
    nyTimes.parseApiData(JSON.parse(body), callback);
  });

};
