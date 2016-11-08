import { describe, it } from 'mocha';
import { List, Map, is } from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';

chai.use(chaiImmutable);

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

      expect(nextState).to.equal(map2);
      const map1 = Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        ),
      });

      expect(state).to.equal(map1);
    });
  });
});
