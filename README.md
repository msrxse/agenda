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

then, to run the Dev Server:

```
npm start
```


    - Visit http://localhost:8080

## Methodology

I this last instance of The contacts app i have included Immutable. I prefer their syntactic sugar to object spread tricks.

**I don’t access the state directly** Reducers are in charge of accesing the store, so when a smart component needs to accesss the state, it would do so throught a selector in the reducer. Not even actions are allowed to access the state directly, so they make use of selectors as well. Selectors are located with the reducers and permit us to do certain calculations before passing the data to the views.

**Why selectors?** Selectors allows us to encapsulate the app state. So if later we decide on changing any aspect of it, I could do so within the reducer and not need to go all over the views and refactor them.

**Minimize view logic in smart components** We extract view logic into dump components. Keeping out smart components as wirings only. One benefit is that some of our components are now reusable.

**I prefer to keep the business logic in thunks** Almost every action that is exported (to be dispatched by views) is a thunk. I usually only dispatch plain object actions from within a thunk in order to update the reducer state. A few actions could be taken directly to the reducers, while this is a valid strategy is not what I am using here.

**About bussiness logic** All business logic is implemented under Redux in the /src/store directory. Most of it is inside thunks in actions.js and some it is inside selectors in reducer.js. This is actually an official rule in this methodology:
```
Rule: Place all business logic inside action handlers (thunks), selectors and reducers.
```
This rule helps in proper separation between views and business logic. One fragrant example is the filtering of contacts, I could put filtering logic withing the view, put prefered to wire mapStateToProps to a selector that did the filtering. So we are not having the smart component accessing the state directly. Also there won't be no filtering logic contained within the component.


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

## Refactorizations

This is far from a finished app, here are some actuations that may be done or not at the time of reading:

√ [1] Added promisse middleware:
        Now we handle all API communication in one place.
      Firing: Initial request and possible fealure handlers
        So we are catching those in the reducers and updating the app accordingly (for loading and error states)
      
     
√ [2] Refactor reducers: Moved functionality from action-creators to reducer.
      While reducers still pure.
      Now action-creator's code is more DRY (no spaguetty code)


* [3] To be done: Normalize state:
       **contactsById** becomes object Indexed by Id (instead of array of objects). Add **contactsByIdArray**. This array  of id's is used by selectors to iterate throught it creating the array of objects needed to be consumed by views.
       This analogous to what the the Normalizr library does. Transforming the nested response data into a normalized shape suitable for integration into the store. See [Normalizr](https://github.com/paularmstrong/normalizr) - Normalizr.
       