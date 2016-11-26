import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import * as contactsActions from '../store/contacts/actions';
import * as contactsSelectors from '../store/contacts/reducer';
import './ContactsScreen.css';

import ContactDetail from '../components/ContactDetail';
import ContactsList from '../components/ContactsList';
import ContactFilter from '../components/ContactFilter';
import ListRow from '../components/ListRow';

class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handlePagination(limit, offset) {
    this.props.dispatch(contactsActions.loadContacts(limit, offset));
  }

  // Called when selecting a contact in list of Contacts
  showItem(itemId) {
    this.props.dispatch(contactsActions.selectContact(itemId));
  }

  deleteItem(itemId) {
    this.props.dispatch(contactsActions.deleteContact(itemId));
  }

  // Prepares new Item to be saved (Won't be saved yet)
  newItem() {
    this.props.dispatch(contactsActions.addNewContact());
  }

  // Handles Edition of an existing contact
  doneEditing(itemId, labelText, newText) {
    this.props.dispatch(contactsActions.editContact(itemId, labelText, newText));
  }

  // Saves new Item
  editNewItem(labelText, newText) {
    this.props.dispatch(contactsActions.newContact(labelText, newText));
  }

  // Called when a record is being edited
  editingItem() {
    this.props.dispatch(contactsActions.editingContact());
  }

  // Called when a record edition has been canceled
  cancelEditing() {
    this.props.dispatch(contactsActions.cancelEditingContact());
  }

  renderRow(item) {
    return (
      <ListRow
        key={item.get('id')}
        itemId={item.get('id')}
        first={item.get('first')}
        last={item.get('last')}
        picture={item.get('picture')}
        deleteItem={this.deleteItem}
        showItem={this.showItem}
      />
    );
  }

  renderErrorMessage() {
    const { error } = this.props;
    if (!error) {
      return null;
    }

    return (
      <div id="message" className="alert alert-danger fade in">
        <p><strong>{error.toString()}</strong></p>
        <p>{'Try reloading again'}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="ContactsScreen">

        {this.renderErrorMessage()}

        <ContactDetail
          isFetching={this.props.isFetching}
          selected={this.props.selected}
          contactsById={this.props.contactsById}
          isPhantom={this.props.isPhantom}
          editNewItem={this.editNewItem}
          editItem={this.editingItem}
          cancelEditing={this.cancelEditing}
          doneEditing={this.doneEditing}
        />
        <ContactsList
          isFetching={this.props.isFetching}
          contactsById={this.props.contactsById}
          count={this.props.count}
          changePage={this.handlePagination}
          newItem={this.newItem}
          renderRow={this.renderRow}
        />
        <ContactFilter
          currentFilter={this.props.params.filter || '/'}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    contactsById: contactsSelectors.getContacts(state, ownProps.params.filter),
    selected: contactsSelectors.getSelected(state),
    isPhantom: contactsSelectors.getIsPhantom(state),
    count: contactsSelectors.getCount(state),
    error: contactsSelectors.getError(state),
    isFetching: contactsSelectors.getIsFetching(state),
  };
}

export default connect(mapStateToProps)(ContactsScreen);
