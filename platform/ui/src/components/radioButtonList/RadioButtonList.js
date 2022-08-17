import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButtonList.css';

export class RadioButtonList extends Component {
  static className = 'RadioButtonList';

  //TODO: Add fields to propTypes.description?
  //These would be label (required), id (required), and checked (optional).
  static propTypes = {
    description: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      })
    ),
  };

  constructor(props) {
    super(props);
    this.state = {};

    for (let button of props.description) {
      if (button.checked) {
        this.state.checked = button.id;
      }
    }
  }

  handleChange(e) {
    this.setState({ checked: e.target.value });
  }

  render() {
    let buttons = this.props.description.map(button => {
      let input = (
        <input
          type="radio"
          checked={this.state.checked === button.id}
          onChange={e => {
            this.handleChange(e);
          }}
          value={button.id}
        />
      );

      //needed to style the custom radio check
      let inputSpan;
      if (this.state.checked === button.id) {
        inputSpan = (
          <span className="dcmcloud-radio-button dcmcloud-selected">{input}</span>
        );
      } else {
        inputSpan = <span className="dcmcloud-radio-button">{input}</span>;
      }

      return (
        <span className="dcmcloud-radio-button-container" key={button.id}>
          <label className="dcmcloud-radio-button-label">
            {inputSpan}
            {button.label}
          </label>
        </span>
      );
    });

    return (
      <div className="dcmcloud-radio-button-group">
        <form>{buttons}</form>
      </div>
    );
  }
}
