import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContactFilter from '../../src/components/ContactFilter';

const { renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate } = TestUtils;

describe('ContactFilter', () => {
  it('clicking on keypad filters list of contacts', () => {
    let filter = false;
    //  We define a mock changeFilter Fucntion
    const currentFilter = () => { filter = true; };
    const component = renderIntoDocument(
      <ContactFilter onClick={currentFilter} />
    );
    const keypad = scryRenderedDOMComponentsWithTag(component, 'label');

    Simulate.click(keypad[0]);

    //  We derify that the filterItem function has been called
    expect(filter).to.equal(true);
  });
});
