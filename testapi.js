const env = require('env2')('./.env');
const request = require('request');

const guardianApiUrl = 'https://content.guardianapis.com/search?q=politics&show-blocks=body,main&show-fields=thumbnail' + process.env.guardian_api;

request(guardianApiUrl, (err, response, body) => {
  const articles = JSON.parse(body);

  const output = [];

  if (articles.response && articles.response.results) {
    console.log('working');

    articles.response.results.forEach(e => {
      const article = {};
      article.title = e.webTitle;
      article.url = e.webUrl;
      article.sumary = e.blocks.body[0].bodyTextSummary;
      article.thumbnail = e.fields.thumbnail;
      output.push(article);
    });
  }

  console.log(output);
  // console.log(body);
});
