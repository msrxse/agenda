import { describe, it } from 'mocha';
import React from 'react';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import DetailRow from '../../src/components/DetailRow';

const { renderIntoDocument,
  Simulate } = TestUtils;

describe('DetailRow', () => {
  it('calls a callback when pressing enter', () => {
    const last = 'frazier';
    let hasDoneEditing = false;
    const doneEditing = () => { hasDoneEditing = true; };
    const component = renderIntoDocument(
      <DetailRow text={last} doneEditing={doneEditing} />
    );
    const input = component.itemInput;
    Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

    expect(hasDoneEditing).to.equal(true);
  });

  it('calls a callback when pressing escape or losing focus', () => {
    const last = 'frazier';
    let hasCanceledEditing = false;
    const cancelEditing = () => { hasCanceledEditing = true; };
    const component = renderIntoDocument(
      <DetailRow text={last} cancelEditing={cancelEditing} />
    );
    const input = component.itemInput;
    Simulate.keyDown(input, { key: 'Escape', keyCode: 27, which: 27 });

    expect(hasCanceledEditing).to.equal(true);
  });
});
