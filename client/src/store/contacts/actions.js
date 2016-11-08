import { Map, fromJS, List, OrderedMap, toJS } from 'immutable';
import 'whatwg-fetch';
import * as types from './actionTypes';
import * as contactsSelectors from '../contacts/reducer';

/**
 * GET: localhost:8000/users
 * API call to retreive all users
 */
export function fetchContacts() {
  return dispatch => fetch('//localhost:8000/users')
    .then(response => response.json())
    .then((data) => {
      dispatch(receiveDataSuccess(data));
    })
    .catch(error => dispatch(receiveDataFailure(error)));
}

function receiveDataSuccess(data) {
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
  return ({ type: types.CONTACTS_FETCHED, contactsById });
}

/**
 * GET: localhost:8000/user/:{id}
 * API call to retreive selected user
 */
export function selectContact(itemId) {
  // return (dispatch, getState) => {
  //   const contacts = contactsSelectors.getContacts(getState());
  //   const selectedContact = contacts.find(contact => contact.get('id') === itemId);
  //   dispatch({ type: types.SHOW_ITEM, selectedContact });
  // };
  return dispatch => fetch(`//localhost:8000/user/${itemId}`)
    .then(response => response.json())
    .then((data) => {
      const selectedContact = Map({
        id: data.id,
        first: data.first,
        last: data.last,
        phone: data.phone,
        cell: data.cell,
        email: data.email,
        username: data.username,
        picture: data.picture,
      });
      dispatch({ type: types.SHOW_ITEM, selectedContact });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
}

/**
 * PUT: localhost:8000/user/:{id}
 * API call to save changes set on the edited user
 */
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
    const jsonSelectedContact = selectedContact.toJS();
    fetch(`//localhost:8000/user/${itemId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: jsonSelectedContact,
      }),
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({ type: types.DONE_EDITING, newList, selectedContact });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
  };
}

/**
 * DELETE: localhost:8000/user/:{id}
 * API call to delete contact
 */
export function deleteContact(itemId) {
  return dispatch => fetch(`//localhost:8000/user/${itemId}`,
    {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then((data) => {
      dispatch({ type: types.DELETE_ITEM, itemId });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
}

/**
 * POST: localhost:8000/user
 *  Creating a new contact
 */
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
    const jsonNewContact = tobeaddItem.toJS();

    fetch('//localhost:8000/users',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: jsonNewContact,
        }),
      })
    .then(response => response.json())
    .then((data) => {
      dispatch({ type: types.EDIT_NEW_ITEM, tobeaddItem, newList });
    })
    .catch(error => dispatch(receiveDataFailure(error)));
  };
}


function receiveDataFailure(error) {
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
