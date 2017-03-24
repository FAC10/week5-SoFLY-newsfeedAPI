# week5-SoFLY-newsfeedAPI: USA vs UK 

![Travis badge](https://travis-ci.org/FAC10/week5-SoFLY-newsfeedAPI.svg?branch=master)
[![codecov](https://codecov.io/gh/FAC10/week5-SoFLY-newsfeedAPI/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC10/week5-SoFLY-newsfeedAPI)

See project brief [here](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-5/project.md).

## User Story

- I want to be able to compare recent news stories from the New York Times and The Guardian.
- I would like to be able to make a direct comparison, so articles on the same topic from both news sources should be contrasted.

## Project Requirements
- [x] Use at least 1 API
- [x] Make your API calls from the back-end using the request module
- [x] Your server should contain a minimum of 2 routes
- [x] Back-end testing using tape (test as many components as you can) and basic front-end testing.
- [x] Test your server by injecting fake HTTP requests using Shot.
- [x] Host your project on heroku, see resources
- [x] Use module.exports and require to break a single large server file into smaller modules.
- [x] Consider a good server file structure based on what we have discussed over the week.
- [x] Employ continuous integration on your project with Travis or a similar tool.
- [x] Use CodeCov or a similar tool for test coverage.
- [x] Display continuous integration and code coverage badges on your project README.
- [x] Ensure that errors are handled, if for example a user attempts to make a request to a non-existent route to your server, provide the user with a custom response.

## Stretch Goal

- [x] Include a search bar so the user can search news stories according to topic.
- [ ] Front-end testing

## Architecture

[Img here]

## Tech Stack

- Code coverage: Istanbul and CodeCov.io
- Continuous integration: Travis CI
- Automatic deployment: Heroku
- Server: http
- Testing: tape
- Server testing: shot

## Day One

- Technical spike on how to use the Guardian API.
- Set up file structure, server, and install Travis as a CI tool.
- Guardian API retrieves title, url, summary, and thumbnail image.
- NYT API retrieves title, url, summary, and thumbnail image.

## Day Two

- Testing Back-end
- Testing Front-end
- Create GUI
- Dom manipulation
