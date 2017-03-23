QUnit.test('Wrong url to api call', assert=>{

  assert.equal(getArticles('trump'), 'err')

});
