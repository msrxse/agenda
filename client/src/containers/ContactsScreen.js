import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import * as contactsActions from '../store/contacts/actions';
import * as contactsSelectors from '../store/contacts/reducer';
// import './ContactsScreen.css';
// import styles from './ContactsScreen.css';

import ContactDetail from '../components/ContactDetail';
import ContactsList from '../components/ContactsList';
import ContactFilter from '../components/ContactFilter';
import ListRow from '../components/ListRow';

class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onKeypadClick(filter) {
    this.props.dispatch(contactsActions.filterContacts(filter));
  }

  editItem() {
    this.props.dispatch(contactsActions.editContact());
  }
  cancelEditing() {
    this.props.dispatch(contactsActions.cancelEditingContact());
  }
  doneEditing(itemId, labelText, newText) {
    this.props.dispatch(contactsActions.doneEditingContact(itemId, labelText, newText));
  }

  showItem(itemId) {
    this.props.dispatch(contactsActions.selectContact(itemId));
  }

  deleteItem(itemId) {
    this.props.dispatch(contactsActions.deleteContact(itemId));
  }

  newItem() {
    this.props.dispatch(contactsActions.addNewContact());
  }
  editNewItem(labelText, newText) {
    this.props.dispatch(contactsActions.editNewContact(labelText, newText));
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

  render() {
    return (
      <div className="ContactsScreen">
        <ContactDetail
          selected={this.props.selected}
          contactsById={this.props.contactsById}
          isPhantom={this.props.isPhantom}
          editNewItem={this.editNewItem}
          editItem={this.editItem}
          cancelEditing={this.cancelEditing}
          doneEditing={this.doneEditing}
        />
        <ContactsList
          contactsById={this.props.contactsById}
          currentFilter={this.props.currentFilter}
          newItem={this.newItem}
          renderRow={this.renderRow}
        />
        <ContactFilter
          onClick={this.onKeypadClick}
          currentFilter={this.props.currentFilter}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contactsById: contactsSelectors.getContacts(state),
    currentFilter: contactsSelectors.getFilter(state),
    selected: contactsSelectors.getSelected(state),
    isPhantom: contactsSelectors.getIsPhantom(state),
  };
}

export default connect(mapStateToProps)(ContactsScreen);