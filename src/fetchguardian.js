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
      if (e.webTitle) {
        article.title = e.webTitle;
      }
      if (e.webUrl) {
        article.url = e.webUrl;
      }
      if (e.blocks && e.blocks.body && e.blocks.body[0].bodyTextSummary) {
        article.sumary = e.blocks.body[0].bodyTextSummary; //@TODO: add a function here that cuts off the summary
      }
      if (e.fields && e.fields.thumbnail) {
        article.thumbnail = e.fields.thumbnail;
      }
      output.push(article);
    });
  }

  //@TODO: Limit search results to 5-10 articles
  //@TODO: Add error handling

  console.log(output);
  // console.log(body);
});
