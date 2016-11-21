import React, { Component } from 'react';
import autoBind from 'react-autobind';
import UserPagination from './UserPagination';
import * as types from '../store/contacts/actionTypes';

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

  changePage = (data) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * types.LIMIT);
    return this.props.changePage(types.LIMIT, offset);
  };

  renderRowThroughProps(item) {
    if (typeof this.props.renderRow === 'function') {
      return this.props.renderRow(item);
    }
    return undefined;
  }

  renderLoading() {
    return (
      <div className="ContactsList">
        <p>Loading...</p>
      </div>
    );
  }

  render() {
    if (!this.props.contactsById) return this.renderLoading();

    const pagination = this.props.count > types.LIMIT ? (
      <UserPagination
        handlePageClick={this.changePage}
        pageCount={Math.ceil(this.props.count / types.LIMIT)}
      />) : '';

    return (
      <div className="ContactsList">
        <h1 className="display-1">Contacts</h1>
        <div className="card-wrapper pre-scrollable">
          {this.props.contactsById.map(item => this.renderRowThroughProps(item))}
        </div>
        <div className="pagination-wrapper">

          {pagination}

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
