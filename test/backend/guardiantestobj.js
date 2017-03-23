let fakeAPIdata = {
  response: {
    results: [
      {
        webTitle:'Test title 1',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      },
      {
        webTitle:'Test title 2',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      },
      {
        webTitle:'Test title 3',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      },
      {
        webTitle:'Test title 4',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      },
      {
        webTitle:'Test title 5',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      },
      {
        webTitle:'Test title 6',
        webUrl:'Test url',
        fields:{ thumbnail:'Test thumbnail'},
        blocks:{ body:[ { bodyTextSummary:'Test summary string' } ] },
      }
    ]
  }
};

let result = [
  {
    title:'Test title 1',
    url:'Test url',
    thumbnail:'Test thumbnail',
    summary: 'Test summary string',
  },
  {
    title:'Test title 2',
    url:'Test url',
    thumbnail:'Test thumbnail',
    summary: 'Test summary string',
  },
  {
    title:'Test title 3',
    url:'Test url',
    thumbnail:'Test thumbnail',
    summary: 'Test summary string',
  },
  {
    title:'Test title 4',
    url:'Test url',
    thumbnail:'Test thumbnail',
    summary: 'Test summary string',
  },
  {
    title:'Test title 5',
    url:'Test url',
    thumbnail:'Test thumbnail',
    summary: 'Test summary string',
  }
];

const guardianTests = [
  [
    fakeAPIdata,
    result
  ]
];

module.exports = guardianTests;
