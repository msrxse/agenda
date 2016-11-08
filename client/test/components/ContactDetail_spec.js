import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Map } from 'immutable';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DetailRow from '../../src/components/DetailRow';

const { renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate } = TestUtils;

describe('DetailRow', () => {
  it('double-click on contact data selects it for editing', () => {
    let edit = false;
    const selected = Map({
      id: 1, last: 'frazier',
    });
    //  We define a mock editKey Function
    const editItem = () => { edit = true; };
    const component = renderIntoDocument(
      <DetailRow selected={selected} editItem={editItem} />
    );
    const labels = scryRenderedDOMComponentsWithTag(component, 'label');

    Simulate.doubleClick(labels[0]);

    //  We derify that the editItem function has been called
    expect(edit).to.equal(true);
  });
});
