const test = require('tape');
const shot = require('shot');
const fs = require('fs');
const path = require('path');
const router = require('./../../src/router');



  const htmlFile =   fs.readFileSync(path.join(__dirname, '..','..', 'public', 'index.html'), 'utf-8');

  // EXAMPLE OBJECT TO RUN MULTIPLE ROUTE TESTS WITH
  // Each key in the object is the name of a test.
  // Each value is an array with two objects:
  // The first - require options for Shot
  // The second - options to test the response with
  // For example in 'route' the object passes in require options of '/' and 'get'
  // and validates the server response of statusCode '200' and type text/html
  const routesToTest = {
    home:[{url:'/', method:'get'},
      {
        statusCode: 200,
        headers: {'Content-Type':'text/html'},
        payload: htmlFile
      }],
    brokenurl:[{url:'/brokenurl'},
      {
        statusCode: 404,
        headers: {'Content-Type':'text/html'},
        payload: '404: Page not found'
      }],
    scriptJS:[{url:'/assets/js/script.js'},
      {
        statusCode: 200,
        headers: {'Content-Type':'application/javascript'},
        payload: fs.readFileSync(path.join(__dirname, '..','..', 'public', 'assets', 'js', 'script.js'), 'utf-8')
      }],
    stylecss:[{url:'/assets/css/style.css'},
      {
        statusCode: 200,
        headers: {'Content-Type':'text/css'},
        payload: fs.readFileSync(path.join(__dirname, '..','..', 'public', 'assets', 'css', 'style.css'), 'utf-8')
      }],

    Apiroutes:[{url:'/search?q=trump'},
      {
        statusCode: 200,
        headers: {'Content-Type':'application/json'},
      }]

  };



  /**
   * [testMultipleRoutes runs ]
   * @param  {object} routesToTest
   * Runs tests on an object filled with routes
   */
  function testMultipleRoutes (routesToTest) {
    Object.keys(routesToTest).forEach(route => {
      testRoute(routesToTest[route], route);
    });
  }

  function testRoute ([reqOptions, resOptions], name = '') {
    const method = reqOptions.method || 'get';
    const url = reqOptions.url || '/';

    test(`Testing '${name || url}' with ${method}`, (t) => {
      shot.inject(router, reqOptions,
        (res) => {
          Object.keys(resOptions).forEach(option => {

            // second level options (headers[content-type], etc.)
            if (typeof resOptions[option] === 'object') {
              Object.keys(resOptions[option]).forEach(innerOption => {
                t.equal(res[option][innerOption], resOptions[option][innerOption],
                  `${option}[${innerOption}] = ${res[option][innerOption]}`
                );
              });
              return;
            }

            // first level objects (statusCode, etc.)
            t.equal(res[option], resOptions[option],
              `${option} = ${res[option]}`);

          });
          t.end();
        });
    });
  }
  module.export = testMultipleRoutes(routesToTest);
