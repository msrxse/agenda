import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import * as contactsActions from './store/contacts/actions';
import routes from './routes';

const store = configureStore();

//  Fetching initial contacts
// store.dispatch(contactsActions.fetchContacts());

// Create an enhanced history that syncs navigation events with the store

const history = syncHistoryWithStore(browserHistory, store);

// Here we listen for URL changes. When clicking on user filter keypad does change URL.
history.listen(location => store.dispatch(contactsActions.filterContacts(location.pathname)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
