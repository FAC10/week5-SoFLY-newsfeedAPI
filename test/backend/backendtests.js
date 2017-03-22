const test = require('tape');
const guardian = require('./../../src/api-calls/guardian.js');

module.exports = () => {
  test('is the backend test running?', (t) => {
    t.pass('yes, backend test running!');
    t.end();
  });

  test('test guardian API', (t) => {
    let expected = 'Hi Finn Hi hi hi hi';
    let result = guardian.cutOffSummary(expected);
    t.equal(expected, result, 'cuttOffSummary function works for under 50 words works');

    expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan metus ac varius porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc est turpis, volutpat et velit eget, mattis vulputate nibh. Maecenas ut lacus fermentum, tempus urna ac, molestie lacus. Curabitur vitae accumsan dolor. Duis...';
    result = guardian.cutOffSummary('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan metus ac varius porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc est turpis, volutpat et velit eget, mattis vulputate nibh. Maecenas ut lacus fermentum, tempus urna ac, molestie lacus. Curabitur vitae accumsan dolor. Duis tempor.');
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

    delete testObj.fields;
    expected = null;
    result = guardian.buildArticle(testObj);
    t.deepEqual(expected, result, 'buildArticle with missing key returns null');

    t.end();


  });
};
