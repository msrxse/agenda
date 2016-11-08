# Contacts App

## Requirements

    - Node.js Version 5.9.1
    - Mysql

## Initialization - Server Side

    - Create a mysql database called agenda with charset UTF-8
To fill the database with users:

```
npm run seed
```

To start the server:

```
npm start
```

## Initialization - Client side

cd into the client folder

To install dependencies:

```
npm install
```

    - Visit http://localhost:8080

# About

This is a classic Contact app. The requirements are as follows:
* Contacts can be added, edited and deleted
* There’s a keypad so contacts are filterable by last name
* When selecting a contact, its info appears on display area.
* Double clicking on contact info opens input form to edit entry
* Hovering over contact list items shows delete button

App is finished even on client side and it is build with:

* [Redux](https://github.com/reactjs/redux) - State container for JavaScript apps
* [React-Router](https://github.com/ReactTraining/react-router) - Navigation component 
* [Redux-Thunk](https://www.npmjs.com/package/redux-thunk) - Asynchronous actions
* [Immutable](https://github.com/facebook/immutable-js) - Immutable persistent data 
* [Mocha](https://github.com/mochajs/mocha) - Test framework for node.js
* [Chai](https://github.com/chaijs/chai) - Assertion framework for node.js
* [Chai-Immutable](https://github.com/astorije/chai-immutable) - Chai assertions for Facebook's Immutable library

and server build with:

* [Express](#) - Express
* [Swagger](#) - Swagger
* [Sequelize](#) - Sequelize


## To run client side test tests:
  
- cd into the client folder

```
npm run test
```

## Tests performed

**immutability**
    The state tree
      √ is immutable

Applying an operation on it involves producing a new state tree, leaving the previous one untouched. If the state tree is a Map with a key 'contacts' that contains a List of contacts, adding a contact means we need to create a new Map, where the contacts key points to a new List.

**application logic**
    setContacts
      √ adds the contacts to the state

the application allows "loading in" a collection of users. We could have a function called setContacts that takes a previous state and a collection of entries and produces a state where the entries are included. 

**application logic**
    setContacts
      √ converts to immutable

The list of contacts to load could also be a regular javaScript array

**DetailRow**
    √ double-click on contact data selects it for editing

The detail view of the left on the screen shows properties of the selected contact, double clicking any row with set the property ready for an edition in situ.

**ContactFilter**
    √ clicking on keypad filters list of contacts

Using the letter keypad should filter the list of contacts present on the app.

**DetailRow**
    √ calls a callback when pressing enter
    √ calls a callback when pressing escape or losing focus

The input fields shown when detail row is in edit mode got 3 handles.

* [1] When the field loses focus (onBlur) the editing is canceled.
* [2] When the scape key is accioned while an input field is in focus, 
      the cancelEdiding action is triggered.
* [3] Pressing enter when on an input fields saves changes, if any.

**ListRow**
    √ renders an item
    √ invokes callback when the delete button is clicked
    √ invokes callback when the list item image is clicked

Test acctions withing the contacts list. Seleccton should occur when click on image, amd when hovering over an item, the delete button should appear. Selecting it should delete item from the list and the database.


