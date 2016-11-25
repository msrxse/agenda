import { fromJS, Map, List } from 'immutable';
import * as types from './actionTypes';

const initialState = fromJS({
  contactsById: undefined,
  selected: undefined,
  isPhantom: false,
  count: 0,
  isFetching: false,
  error: null,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NEW_CONTACT_REQUEST:
    case types.EDIT_CONTACT_REQUEST:
    case types.CONTACT_REQUEST:
    case types.CONTACTS_REQUEST:
      return state.merge({
        isFetching: true,
        error: null,
      });
    case types.CONTACTS_SUCCESS:
      return state.merge({
        isFetching: false,
        count: action.result.count,
        contactsById: List(action.result.rows.map((contact) => {
          return Map({
            id: contact.id,
            first: contact.first,
            last: contact.last,
            phone: contact.phone,
            cell: contact.cell,
            email: contact.email,
            username: contact.username,
            picture: contact.picture,
          });
        })),
      });
    case types.DELETE_CONTACT_FAILURE:
    case types.NEW_CONTACT_FAILURE:
    case types.EDIT_CONTACT_FAILURE:
    case types.CONTACT_FAILURE:
    case types.CONTACTS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    case types.CONTACT_SUCCESS:
      return state.merge({
        isFetching: false,
        // isPhantom: false,
        selected:
          Map({
            id: action.result.id,
            first: action.result.first,
            last: action.result.last,
            phone: action.result.phone,
            cell: action.result.cell,
            email: action.result.email,
            username: action.result.username,
            picture: action.result.picture,
          }),
      });
    case types.EDIT_CONTACT_SUCCESS:
      return state.merge({
        contactsById: action.newList,
        selected: action.selectedContact,
      });
    case types.NEW_CONTACT_SUCCESS:
      return state.merge({
        contactsById: action.newList,
        isPhantom: false,
        isFetching: false,
        selected: action.tobeaddItem,
      });
    case types.DELETE_CONTACT_SUCCESS:
      return state.update('contactsById',
        contacts => contacts.filterNot(
          item => item.get('id') === action.itemId
        )
      );
    case types.NEW_ITEM:
      return state.merge({
        isPhantom: true,
      });
    case types.EDITING_CONTACT:
    case types.CANCEL_EDITING_CONTACT:
    case types.DELETE_CONTACT_REQUEST:
    default:
      return state;
  }
}

// selectors

export function getContacts(state, filter) {
  const contactsById = state.contacts.get('contactsById');
  return contactsById;
}

export function getSelected(state) {
  const selected = state.contacts.get('selected');
  return selected;
}

export function getIsPhantom(state) {
  const isPhantom = state.contacts.get('isPhantom');
  return isPhantom;
}

export function getCount(state) {
  const count = state.contacts.get('count');
  return count;
}
