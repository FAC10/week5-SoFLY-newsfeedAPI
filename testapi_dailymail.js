const env = require('env2')('./.env');
const request = require('request');
const API_KEY = process.env.dailymail_api;
const url = `https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=${API_KEY}`;

request(url, function(error, response, body){
console.log(API_KEY);
  console.log(body.status);
});
