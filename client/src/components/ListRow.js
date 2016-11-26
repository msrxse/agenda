import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class DetailRow extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleShowItem = () => {
    this.props.showItem(this.props.itemId);
  }

  handleDeleteItem = () => {
    this.props.deleteItem(this.props.itemId);
  }

  render() {
    return (
      <div className="card card-inverse text-xs-center">

        <button onClick={this.handleShowItem}>
          <img className="card-img-top" src={this.props.picture} alt="Card cap" />
        </button>

        <p className="card-text text-muted">
          {`${this.props.last}, ${this.props.first}`}
        </p>

        <button
          type="button"
          className="destroy"
          onClick={this.handleDeleteItem}
        ><i className="fa fa-remove" /></button>
      </div>
    );
  }
}
