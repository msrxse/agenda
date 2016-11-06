import { fromJS, Map, List } from 'immutable';
import * as types from './actionTypes';

const initialState = fromJS({
  contactsById: undefined,
  selected: undefined,
  currentFilter: 'all',
  isPhantom: false,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CONTACTS_FETCHED:
      return state.merge({
        contactsById: action.contactsById,
      });
    case types.CHANGE_FILTER:
      return state.merge({
        currentFilter: action.currentFilter,
        selected: undefined,
      });
    case types.NEW_ITEM:
      return state.merge({
        isPhantom: true,
      });
    case types.DELETE_ITEM:
      return state.update('contactsById',
        contacts => contacts.filterNot(
          item => item.get('id') === action.itemId
        )
      );
    case types.SHOW_ITEM:
      return state.merge({
        selected: action.selectedContact,
        isPhantom: false,
      });
    case types.EDIT_NEW_ITEM:
      return state.merge({
        contactsById: action.newList,
        isPhantom: false,
        selected: action.tobeaddItem,
      });
    case types.EDIT_ITEM:
      return state;
    case types.CANCEL_EDITING:
      return state;
    case types.DONE_EDITING:
      return state.merge({
        contactsById: action.newList,
        selected: action.selectedContact,
      });
    default:
      return state;
  }
}

// selectors

export function getContacts(state) {
  const currentFilter = state.contacts.get('currentFilter');
  const contactsById = state.contacts.get('contactsById');
  if (contactsById) {
    return contactsById.filter(
      item => currentFilter === 'all' || item.get('last').charAt(0).toLowerCase() === currentFilter
    );
  }
  return undefined;
}

export function getFilter(state) {
  const currentFilter = state.contacts.get('currentFilter');
  // console.log(currentFilter);
  return currentFilter;
}

export function getSelected(state) {
  const selected = state.contacts.get('selected');
  return selected;
}

export function getIsPhantom(state) {
  const isPhantom = state.contacts.get('isPhantom');
  return isPhantom;
}
