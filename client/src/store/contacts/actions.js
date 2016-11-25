import { Map, fromJS, List, OrderedMap, toJS } from 'immutable';
import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
import * as contactsSelectors from '../contacts/reducer';

/**
 * Helper: Adding params to url
 */
function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

/**
 * GET: localhost:8000/users
 * API call to retreive all users
 */
export function loadContacts(limit = types.LIMIT, offset = 0) {
  const baseUrl = '//localhost:8000';
  let url = `${baseUrl}/users/`;
  const params = { limit, offset };
  url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);

  return {
    types: [types.CONTACTS_REQUEST, types.CONTACTS_SUCCESS, types.CONTACTS_FAILURE],
    promise: fetch(url),
  };
}

/**
 * GET: localhost:8000/users/search/:{filter}
 * API call to retreive filtered list of users
 */
export function filterContacts(currentFilter) {
  if (currentFilter === '/') return loadContacts();

  return {
    types: [types.CONTACTS_REQUEST, types.CONTACTS_SUCCESS, types.CONTACTS_FAILURE],
    promise: fetch(`//localhost:8000/users/search${currentFilter}`),
  };
}

/**
 * GET: localhost:8000/user/:{id}
 * API call to retreive selected user
 */
export function selectContact(itemId) {
  return {
    types: [types.CONTACT_REQUEST, types.CONTACT_SUCCESS, types.CONTACT_FAILURE],
    promise: fetch(`//localhost:8000/user/${itemId}`),
    itemId,
  };
}
/**
 * Called when editing an existing contact
 * Previous to saving the changes
 */
export function editContact(itemId, labelText, newText) {
  return (dispatch, getState) => {
    const contactsById = contactsSelectors.getContacts(getState());
    const newList = contactsById.map((item) => {
      if (item.get('id') === itemId) {
        return item.set(labelText, newText);
      }
      return item;
    });
    const selectedContact = newList.find(contact => contact.get('id') === itemId);

    dispatch(saveEditContact(itemId, newList, selectedContact));
  };
}

/**
 * PUT: localhost:8000/user/:{id}
 * API call to save changes set on the edited user
 */
function saveEditContact(itemId, newList, selectedContact) {
  const jsonSelectedContact = selectedContact.toJS();
  return {
    types: [types.EDIT_CONTACT_REQUEST, types.EDIT_CONTACT_SUCCESS, types.EDIT_CONTACT_FAILURE],
    promise:
      fetch(`//localhost:8000/user/${itemId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: jsonSelectedContact,
        }),
      }),
    newList,
    selectedContact,
  };
}

/**
 * Called when an edition happens in new record.
 * Previous to saving the record
 */
export function newContact(labelText, newText) {
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

    dispatch(saveNewContact(tobeaddItem, newList));
  };
}

/**
 * POST: localhost:8000/users
 *  Creating a new contact
 */
function saveNewContact(tobeaddItem, newList) {
  const jsonNewContact = tobeaddItem.toJS();
  return {
    types: [types.NEW_CONTACT_REQUEST, types.NEW_CONTACT_SUCCESS, types.NEW_CONTACT_FAILURE],
    promise:
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
        }),
    tobeaddItem,
    newList,
  };
}

/**
 * DELETE: localhost:8000/user/:{id}
 * API call to delete contact
 */
export function deleteContact(itemId) {
  return {
    types: [types.DELETE_CONTACT_REQUEST, types.DELETE_CONTACT_SUCCESS, types.DELETE_CONTACT_FAILURE],
    promise:
      fetch(`//localhost:8000/user/${itemId}`,
        {
          method: 'DELETE',
        }),
    itemId,
  };
}

/**
 * Called when selecting AddNew button.
 * Shows a new record prepared to be saved.
 * (Won't save unless an edition happens and ENTER in pressed)
 */
export function addNewContact() {
  return ({ type: types.NEW_ITEM });
}

// Called when an editin of a record is started
export function editingContact() {
  return ({ type: types.EDITING_CONTACT });
}

// Called when a record edition has been canceled
export function cancelEditingContact() {
  return ({ type: types.CANCEL_EDITING_CONTACT });
}
