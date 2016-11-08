/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { List, Map, is } from 'immutable';

describe('immutability', () => {
  describe('The state tree', () => {
    function addContact(currentState, contact) {
      return currentState.update('contacts', contacts => contacts.push(contact));
    }
    it('is immutable', () => {
      const state = Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        ),
      });
      const nextState = addContact(state, Map({ id: 3, last: 'arnold', first: 'christina' }));

      const map2 = Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
          Map({ id: 3, last: 'arnold', first: 'christina' }),
        ),
      });
      // The expectation to.equal seems to behave differently depending
      // on the environnement (Node or a browser)
      // The solution is to use the Immutable.js API .is()
      expect(is(nextState, map2)).to.be.true;

      const map1 = Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        ),
      });

      expect(is(state, map1)).to.be.true;
    });
  });
});
