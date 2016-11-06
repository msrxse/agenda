import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contacts from './contacts/reducer';

export default combineReducers({
  contacts,
  routing: routerReducer,
});
