const test = require('tape');
const guardian = require('./../../src/api-calls/guardian');
const guardianTestObj = require('./guardiantestarray');
const nyTimes = require('./../../src/api-calls/newyorktimes');
const nyTimesTestObj = require('./nytimestestarray');
const parallel = require('./../../src/api-calls/parallel');

test('is the backend test running?', (t) => {
  t.pass('yes, backend test running!');
  t.end();
});

test('test handler response to guardian API', (t) => {
  let expected = 'Hi Finn Hi hi hi hi';
  let result = guardian.cutOffSummary(expected);
  t.equal(expected, result, 'cuttOffSummary function works for under 50 words works');

  expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan metus ac varius porttitor. Orci varius natoque penatibus et magnis...';
  result = guardian.cutOffSummary('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan metus ac varius porttitor. Orci varius natoque penatibus et magnis dis');
  t.equal(expected, result, 'cuttOffSummary function works for over 50 words works');

  let testObj = {
    webTitle:'Test title',
    webUrl:'Test url',
    fields:{ thumbnail:'Test thumbnail'},
    blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
  };
  expected = {
    title: 'Test title',
    url: 'Test url',
    thumbnail: 'Test thumbnail',
    summary: 'Test summary string'
  };
  result = guardian.buildArticle(testObj);
  t.deepEqual(expected, result, 'buildArticle returns built object');
  deleteKeyTest(testObj, guardian.buildArticle, t);

  guardianTestObj.forEach((test) => {
    const fakeApi = test[0];
    const apiResult = test[1];
    guardian.parseApiData(fakeApi, (err, result)=> {
      if(err) {
        t.deepEqual(err, apiResult, `parseApiData correctly responds to an error`);
        return;
      }
      t.deepEqual(result, apiResult, `input data: ${fakeApi.response.results.length}, output data: ${apiResult.length}, parseApiData correctly responds to data`);
    });
  });

  t.end();
});

test('test handler response to newyorktimes API', (t) => {
  let testObj = {
    headline: { main: 'Test title'},
    web_url: 'Test url',
    snippet: 'Test snippet',
    multimedia: ['', {url: 'Test thumbnail' }]
  };

  let expected = {
    title: 'Test title',
    url: 'Test url',
    summary: 'Test snippet',
    thumbnail: 'http://www.nytimes.com/' + 'Test thumbnail'
  };

  let result = nyTimes.buildArticle(testObj);
  t.deepEqual(expected, result, 'buildArticle returns built object');
  deleteKeyTest(testObj, nyTimes.buildArticle, t);

  nyTimesTestObj.forEach((test) => {
    const fakeApi = test[0];
    const apiResult = test[1];
    nyTimes.parseApiData(fakeApi, (err, result)=> {
      if(err) {
        t.deepEqual(err, apiResult, `parseApiData correctly responds to an error`);
        return;
      }
      t.deepEqual(result, apiResult, `input data: ${fakeApi.response.docs.length}, output data: ${apiResult.length}, parseApiData correctly responds to data`);
    });
  });


  t.end();
});

test('Parallel function behaves correctly', (t) => {
  const func1 = (st, cb) => {
    if (!st) return cb(new Error('Error-func1'));
    cb(null, 'Yes-func1');
  };
  const func2 = (st, cb) => {
    if (st === 'N') return cb(new Error('Error-func2'));
    cb(null, 'Yes-func2');
  };

  t.plan(2);

  parallel([func1, func2], 'Pass', (err, res) => {
    t.deepEqual(['Yes-func1', 'Yes-func2'], res,
      'functions output in correct order');
  });

  parallel([func1, func2], '', (err, res) => {
    t.deepEqual('Error-func1', err.message,
      'If there\'s an error in one of the tasks, the function calls it back correctly');
  });

});

function deleteKeyTest(obj, func, test) {
  Object.keys(obj).forEach((props) => {
    const tempProp = obj[props];
    delete obj[props];
    const expected = null;
    const result = func(obj);
    test.deepEqual(expected, result, 'buildArticle with missing key returns null');

    obj[props] = tempProp;
  });
}
