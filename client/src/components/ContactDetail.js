import { OrderedMap } from 'immutable';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import DetailRow from './DetailRow';


export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderLoading(msg) {
    return (
      <div className="display">
        {msg ? <p>No users found</p> : <p>Loading...</p>}
      </div>
    );
  }

  render() {
    if (!this.props.contactsById) return this.renderLoading();
    const detail = this.props.selected || this.props.contactsById.first();
    if (!detail) return this.renderLoading('No users found');
    return (
      <div className="display">
        <img
          src={this.props.isPhantom ? 'avatar.png' : detail.get('picture')}
          alt={this.props.isPhantom ? 'No image set' : `${detail.get('last')} ${detail.get('first')}`}
        />

        {detail.entrySeq().map(values =>
          <DetailRow
            key={`${values[0]}${values[1]}`}
            labelText={this.props.isPhantom ? values[1] : values[0]}
            text={this.props.isPhantom ? values[0] : values[1]}
            itemId={this.props.isPhantom ? null : detail.get('id')}
            isPhantom={this.props.isPhantom}
            editNewItem={this.props.editNewItem}
            editItem={this.props.editItem}
            cancelEditing={this.props.cancelEditing}
            doneEditing={this.props.doneEditing}
          />
        )}

      </div>
    );
  }
}
