# Project Title

This is a classic Contact app. The requirements are as follows:
* A contact can be added, edited and deleted
* There’s a keypad so contacts are filterable by last name
* When selecting a contact, its info appears on display area.
* Double clicking on contact info opens input form to edit entry
* Hovering over contact list items shows delete button

### Installation

```
npm install
```

### Running Dev Server 

```
npm start
```
Go to http://localhost:8080

## Running the tests

I have used Mocha and Chai as test framework for this app. They are widely used, and the output they produce (a diff comparison of the expected and actual result) is great for doing test-driven-development. Chai-Immutable is a chai plugin that handles immutable data structures.

### To run tests: 

```
npm run test
```

## Built With

* [Redux](https://github.com/reactjs/redux) - State container for JavaScript apps
* [Mocha](https://github.com/mochajs/mocha) - Test framework for node.js
* [Chai](https://github.com/chaijs/chai) - Assertion framework for node.js
* [Chai-Immutable](https://github.com/astorije/chai-immutable) - Chai assertions for Facebook's Immutable library
* [Immutable](https://github.com/facebook/immutable-js) - Immutable persistent data collections 

## Authors

* **Marco Suarez** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
