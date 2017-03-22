const env = require('env2')('./.env');
const request = require('request');

const guardianFetch = (searchterm, callback) => {

  const guardianPath = 'https://content.guardianapis.com/search?q=';
  const endQueries = '&show-blocks=body,main&show-fields=thumbnail';
  const guardianApiKey = process.env.guardian_api;

  const guardianApiUrl = guardianPath + searchterm + endQueries + guardianApiKey;

  function cutOffSummary(string, len = 50) {
    const words = string.split(' ');
    if (words.length >= len) {
      return words.slice(0, len).join(' ') + '...';
    }
    return string;
  }

  function buildArticle(e) {
    const article = {};
    if (e.webTitle) {
      article.title = e.webTitle;
    }
    if (e.webUrl) {
      article.url = e.webUrl;
    }
    if (e.blocks && e.blocks.body && e.blocks.body[0].bodyTextSummary) {
      article.sumary = cutOffSummary(e.blocks.body[0].bodyTextSummary);
    }
    if (e.fields && e.fields.thumbnail) {
      article.thumbnail = e.fields.thumbnail;
    }

    return Object.keys(article).length === 4 ?
      article :
      null;
  }


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
          const article = buildArticle(e);
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

guardianFetch('trump', (err, result)=>{
  console.log(result);
});
