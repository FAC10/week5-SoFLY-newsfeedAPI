let fakeAPIdata = {
  response: {
    docs: [
      {
        headline: {main: 'Test title 1'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 2'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 3'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 4'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 5'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 6'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      },
    ]
  }
};

let result = [
  {
    title:'Test title 1',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  },
  {
    title:'Test title 2',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  },
  {
    title:'Test title 3',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  },
  {
    title:'Test title 4',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  },
  {
    title:'Test title 5',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  }
];

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

let fakeAPIdata2 = {
  response: {
    docs: [
      {
        headline: {main: 'Test title 1'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      }
    ]
  }
};

let result2 = [
  {
    title:'Test title 1',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  }
];

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

let fakeAPIdata3 = {
  response: {
  }
};

let result3 = new Error('No search results');
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

let fakeAPIdata4 = {
  response: {
    docs: [
      {
        headline: {main: 'Test title 1'},
        web_url:'Test url',
        multimedia: [{}, {url: 'Test image url'}],
      },
      {
        headline: {main: 'Test title 2'},
        web_url:'Test url',
        snippet: 'Test summary',
        multimedia: [{}, {url: 'Test image url'}],
      }
    ]
  }
};

let result4 = [
  {
    title:'Test title 2',
    url:'Test url',
    summary: 'Test summary',
    thumbnail:'http://www.nytimes.com/' + 'Test image url',
  }
];

const nyTimesTests = [
  [
    fakeAPIdata,
    result
  ],
  [
    fakeAPIdata2,
    result2
  ],
  [
    fakeAPIdata3,
    result3
  ],
  [
    fakeAPIdata4,
    result4
  ]
];

module.exports = nyTimesTests;
