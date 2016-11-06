import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  newItem() {
    if (typeof this.props.newItem === 'function') {
      this.props.newItem();
    }
  }

  renderLoading() {
    return (
      <div className="ContactsList">
        <p>Loading...</p>
      </div>
    );
  }

  renderRowThroughProps(item) {
    if (typeof this.props.renderRow === 'function') {
      return this.props.renderRow(item);
    }
    return undefined;
  }

  render() {
    if (!this.props.contactsById) return this.renderLoading();
    return (
      <div className="ContactsList">
        <h1 className="display-1">Contacts</h1>
        <div className="card-wrapper pre-scrollable">
          {this.props.contactsById.map(item => this.renderRowThroughProps(item))}
        </div>

        <div className="newContact">
          <button onClick={this.newItem}>
            <h1><i className="fa fa-plus" /></h1>
          </button>
        </div>

      </div>
    );
  }
}
