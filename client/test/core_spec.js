import { describe, it } from 'mocha';
import { List, Map, is, fromJS } from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';

describe('application logic', () => {
  describe('setContacts', () => {
    function setContacts(state, contacts) {
      const list = List(contacts);
      return state.set('contacts', list);
    }
    it('adds the contacts to the state', () => {
      const state = Map();
      const contacts = List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        );
      const nextState = setContacts(state, contacts);

      expect(nextState).to.equal(Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        ),
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const contacts = [
        { id: 1, last: 'frazier', first: 'tony' },
        { id: 2, last: 'reyes', first: 'diane' },
      ];
      const nextState = setContacts(state, fromJS(contacts));

      expect(nextState).to.equal(Map({
        contacts: List.of(
          Map({ id: 1, last: 'frazier', first: 'tony' }),
          Map({ id: 2, last: 'reyes', first: 'diane' }),
        ),
      }));
    });
  });
});
