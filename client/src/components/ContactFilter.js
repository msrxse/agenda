import React, { Component } from 'react';
import { List } from 'immutable';
import autoBind from 'react-autobind';

export default class ContactFilter extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick(letter) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(letter);
    }
  }

  render() {
    const letters = List(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']);

    return (
      <div className="ContactFilter">
        <div className="all-btn">
          <button
            onClick={() => this.onClick('all')}
          ><h4>All Contacts <i className="fa fa-child" aria-hidden="true" /></h4>
          </button>
        </div>

        <div className="keypad">
          {letters.map(letter =>
            <label
              key={letter}
              htmlFor="options"
              className={`${this.props.currentFilter === letter ? 'active' : ''} btn sharp btn-outline-secondary`}
              onClick={() => this.onClick(letter)}
            >
              <input type="radio" className="sr-only" /> {letter}
            </label>
          )}
        </div>

      </div>
    );
  }
}
