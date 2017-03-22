const test = require('tape');
const backendTests = require('./backend/backendtests.js');
// const frontendTests = require('./frontend/frontendtest.js');

test('Check tape is working with a simple passing test', (t) => {
  t.pass('a message to print out on sucess');
  t.end();
});

backendTests();
// frontendTests();
