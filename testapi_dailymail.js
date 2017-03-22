const env = require('env2')('./.env');
const request = require('request');
const API_KEY = process.env.dailymail_api;
const url = `https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=${API_KEY}`;

request(url, (error, response, body)=>{
  const mail = JSON.parse(body);
  const output = [];

  mail.articles.forEach(e => {
    const holder = {};
    if(e.title){
      holder.title = e.title;
    }
    if(e.url){
      holder.url = e.url;
    }
    if (e.description){
      holder.description = e.description;
    }
    if(e.urlToImage){
      holder.thumbnail = e.urlToImage;
    }
    output.push(holder);
  });

  console.log(output);
});
