const env = require('env2')('./.env');
const request = require('request');

const guardian = module.exports = {};

/**
 * Cuts off a string at a specified number of words
 * @param  {string} string paragraph
 * @param  {number} len number of words
 * @return {string} string containing < len words
 */
guardian.cutOffSummary = (string, len = 50) => {
  const words = string.split(' ');
  if (words.length >= len) {
    return words.slice(0, len).join(' ') + '...';
  }
  return string;
}

/**
 * Builds an article object with 4 key:value pairs
 * @param  {object} apiObj guardian API
 * @return {object} or null if value not found
 */
guardian.buildArticle = (apiObj) => {
  const article = {};
  if (apiObj.webTitle) {
    article.title = apiObj.webTitle;
  }
  if (apiObj.webUrl) {
    article.url = apiObj.webUrl;
  }
  if (apiObj.blocks && apiObj.blocks.body && apiObj.blocks.body[0].bodyTextSummary) {
    article.sumary = guardian.cutOffSummary(apiObj.blocks.body[0].bodyTextSummary);
  }
  if (apiObj.fields && apiObj.fields.thumbnail) {
    article.thumbnail = apiObj.fields.thumbnail;
  }

  return Object.keys(article).length === 4 ?
  article :
  null;
}

/**
 * guardian API fetch function
 * @param  {string} searchterm
 * @param  {Function} callback
 */
guardian.fetch = (searchterm, callback) => {
  const guardianPath = 'https://content.guardianapis.com/search?q=';
  const endQueries = '&show-blocks=body,main&show-fields=thumbnail';
  const guardianApiKey = process.env.guardian_api;

  const guardianApiUrl = guardianPath + searchterm + endQueries + guardianApiKey;

  request(guardianApiUrl, (err, response, body) => {
    const articles = JSON.parse(body);

    const output = [];
    if (err) {
      callback(err);
    }
    if (articles.response && articles.response.results) {
      console.log('working');

      articles.response.results.forEach(e => {
        if (output.length < 5) {
          const article = guardian.buildArticle(e);
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
  });
};
