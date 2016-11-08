import { describe, it } from 'mocha';
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ListRow from '../../src/components/ListRow';

const { renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate } = TestUtils;

describe('ListRow', () => {
  it('renders an item', () => {
    const last = 'frazier';
    const component = renderIntoDocument(
      <ListRow last={last} />
    );
    const items = scryRenderedDOMComponentsWithClass(component, 'card');

    expect(items.length).to.equal(1);
    expect(items[0].textContent).to.contain('frazier');
  });

  it('invokes callback when the delete button is clicked', () => {
    const last = 'frazier';
    let deleted = false;
    //  We define a mock deleteItem Fucntion
    const deleteItem = () => { deleted = true; };
    const component = renderIntoDocument(
      <ListRow last={last} deleteItem={deleteItem} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);

    //  We derify that the deleteItem function has been called
    expect(deleted).to.equal(true);
  });

  it('invokes callback when the list item image is clicked', () => {
    const last = 'frazier';
    let show = false;
    //  We define a mock showItem Fucntion
    const showItem = () => { show = true; };
    const component = renderIntoDocument(
      <ListRow last={last} showItem={showItem} />
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(items[0]);

    //  We derify that the showItem function has been called
    expect(show).to.equal(true);
  });
});
