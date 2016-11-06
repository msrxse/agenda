import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import ContactsScreen from './containers/ContactsScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ContactsScreen} />
  </Route>
);
