import React from 'react';
import PropTypes from 'prop-types';

function DCMCloudComponentPlugin(props) {
  return <React.Fragment>{props.children}</React.Fragment>;
}

DCMCloudComponentPlugin.propTypes = {
  id: PropTypes.string.isRequired,
  init: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default DCMCloudComponentPlugin;
