import { List, Map } from 'immutable';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContactsList from '../../src/components/ContactsList';

const { renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate } = TestUtils;

describe('ContactsList', () => {
  it('renders contacts filtered by last name first char', () => {
    const contactsById = List.of(
      Map({ id: 1, last: 'frazier' }),
      Map({ id: 2, last: 'reyes' }),
      Map({ id: 3, last: 'dumas' }),
    );
    const currentFilter = 'f';
    const component = renderIntoComponent(
      <ContactsList currentFilter={filter} contactsById={contacts} />
    );
    const items = scryRenderedDOMComponentsWithClass(component, 'ContactsList');

    expect(items.length).to.equal(1);
    expect(items[0].textContent).to.contain('frazier');
  });
});
