import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class DetailRow extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      value: props.text,
      isEditing: false,
      isComposing: false,
    };
  }

  //  Here we switch local state variable
  //  to be the css class that hides/shows either label or input
  onDoubleClickHandler() {
    this.setState({ isEditing: true });
    this.setState({ isComposing: true }, () => {
      this.refs.itemInput.focus(); // AutoFocus won't work, this will focus input shown
    });
    this.setState({ value: this.props.text });  //  <-- shows current contact info in input
    return this.props.editItem();
  }

  handleOnBlur() {
    return this.cancelEditing();
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.setState({ isEditing: false });
        if (this.props.isPhantom) {
          return this.props.editNewItem(this.props.text, this.state.value);
        }
        return this.props.doneEditing(this.props.itemId, this.props.labelText, this.state.value);

      case 'Escape':
        return this.cancelEditing();
      default:
        return true;
    }
  }

  cancelEditing() {
    this.setState({ value: this.props.text });
    this.setState({ isEditing: false });
    return this.props.cancelEditing();
  }

  render() {
    const itemClass = this.state.isEditing ? 'detail editing' : 'detail';
    return (
      <div className={itemClass}>
        <label htmlFor="contact" ref="text" onDoubleClick={() => this.onDoubleClickHandler()} >
          <p>{this.props.text}</p>
        </label>
        <input
          className="edit"
          autoFocus
          value={this.state.value}
          onChange={this.handleOnChange}
          type="text"
          ref="itemInput"
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleOnBlur}
        />
      </div>
    );
  }
}
