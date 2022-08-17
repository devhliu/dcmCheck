import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.css';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    id: `TextInput-${new Date().toTimeString()}`,
    label: undefined,
    type: 'text',
  };

  render() {
    return (
      <div className="input-dcmcloud-container">
        {this.props.label && (
          <label className="input-dcmcloud-label" htmlFor={this.props.id}>{this.props.label}</label>
        )}
        <input
          type={this.props.type}
          id={this.props.id}
          className="form-control input-dcmcloud"
          {...this.props}
        />
      </div>
    );
  }
}

export { TextInput };
