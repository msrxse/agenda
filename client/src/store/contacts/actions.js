import { Map, fromJS, List, OrderedMap } from 'immutable';
import 'whatwg-fetch';
import * as types from './actionTypes';
import * as contactsSelectors from '../contacts/reducer';

export function fetchContacts() {
  return dispatch => fetch('//localhost:8000/users')
    .then(response => response.json())
    .then((data) => {
      // const contactsById = data.map((item) => {
      //   return { [item.id]: item };
      // }).reduce((a, b) => {
      //   return Object.assign(a, b);
      // });
      const contactsById = data.map((contact) => {
        return {
          id: contact.id,
          first: contact.first,
          last: contact.last,
          phone: contact.phone,
          cell: contact.cell,
          email: contact.email,
          username: contact.username,
          picture: contact.picture,
        };
      });
      dispatch({ type: types.CONTACTS_FETCHED, contactsById });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
}

export function selectContact(itemId) {
  // return (dispatch, getState) => {
  //   const contacts = contactsSelectors.getContacts(getState());
  //   const selectedContact = contacts.find(contact => contact.get('id') === itemId);
  //   dispatch({ type: types.SHOW_ITEM, selectedContact });
  // };
  return dispatch => fetch(`//localhost:8000/user/${itemId}`)
    .then(response => response.json())
    .then((data) => {
      const selectedContact = Map(data);
      dispatch({ type: types.SHOW_ITEM, selectedContact });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
}

export function receiveDataFailure(error) {
  console.log(error, 'Theres been an error retreiving data');
}

export function filterContacts(currentFilter) {
  return ({ type: types.CHANGE_FILTER, currentFilter });
}

export function addNewContact() {
  return ({ type: types.NEW_ITEM });
}

export function editContact() {
  return ({ type: types.EDIT_ITEM });
}

export function cancelEditingContact() {
  return ({ type: types.CANCEL_EDITING });
}

export function deleteContact(itemId) {
  return ({ type: types.DELETE_ITEM, itemId });
}

export function doneEditingContact(itemId, labelText, newText) {
  return (dispatch, getState) => {
    const contactsById = contactsSelectors.getContacts(getState());

    const newList = contactsById.map((item) => {
      if (item.get('id') === itemId) {
        return item.set(labelText, newText);
      }
      return item;
    });
    const selectedContact = newList.find(contact => contact.get('id') === itemId);
    dispatch({ type: types.DONE_EDITING, newList, selectedContact });
  };
}

export function editNewContact(labelText, newText) {
  return (dispatch, getState) => {
    const contacts = contactsSelectors.getContacts(getState());
    const itemId = contacts.reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;
    const basket = Map()
      .set('id', itemId)
      .set('first', 'first')
      .set('last', 'last')
      .set('phone', 'phone')
      .set('cell', 'cell')
      .set('email', 'email')
      .set('username', 'username')
      .set('picture', 'avatar.png');

    const tobeaddItem = basket.set(labelText, newText);
    const newList = contacts.push(tobeaddItem).reverse();
    dispatch({ type: types.EDIT_NEW_ITEM, tobeaddItem, newList });
  };
}
