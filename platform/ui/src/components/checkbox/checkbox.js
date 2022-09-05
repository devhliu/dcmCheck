import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkbox.css';

export class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { checked: !!props.checked, label: props.label };
  }

  handleChange(e) {
    const checked = e.target.checked;
    this.setState({ checked });
    if (this.props.onChange) this.props.onChange(checked);
  }

  componentDidUpdate(props) {
    const { checked = false, label } = props;

    if (this.state.checked !== checked || this.state.label !== label) {
      this.setState({
        checked,
        label,
      });
    }
  }

  render() {
    let checkbox;
    if (this.state.checked) {
      checkbox = <span className="dcmcloud-checkbox dcmcloud-checked" />;
    } else {
      checkbox = <span className="dcmcloud-checkbox" />;
    }

    return (
      <div className="dcmcloud-check-container">
        <form>
          <label className="dcmcloud-check-label">
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleChange.bind(this)}
            />
            {checkbox}
            {this.state.label}
          </label>
        </form>
      </div>
    );
  }
}
