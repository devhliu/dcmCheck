import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DCMCloud from '@dcmcloud/core';
import DCMCloudComponentPlugin from './DCMCloudComponentPlugin.js';
import DicomPDFViewport from './DicomPDFViewport';

const { DicomLoaderService } = DCMCloud.utils;

class DCMCloudDicomPDFViewport extends Component {
  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
    viewportData: PropTypes.object,
    activeViewportIndex: PropTypes.number,
    setViewportActive: PropTypes.func,
  };

  state = {
    byteArray: null,
    error: null,
  };

  static id = 'DicomPDFViewportPDF';

  static init() {
    console.log('DicomPDFViewport init()');
  }

  static destroy() {
    console.log('DicomPDFViewport destroy()');
  }

  componentDidMount() {
    const { displaySet, studies } = this.props.viewportData;

    DicomLoaderService.findDicomDataPromise(displaySet, studies).then(
      data => this.setState({ byteArray: new Uint8Array(data) }),
      error => {
        this.setState({ error });
        throw new Error(error);
      }
    );
  }

  render() {
    const {
      setViewportActive,
      viewportIndex,
      activeViewportIndex,
    } = this.props;
    const { byteArray, error } = this.state;
    const { id, init, destroy } = DCMCloudDicomPDFViewport;
    const pluginProps = { id, init, destroy };

    return (
      <DCMCloudComponentPlugin {...pluginProps}>
        {byteArray && (
          <DicomPDFViewport
            byteArray={byteArray}
            setViewportActive={setViewportActive}
            viewportIndex={viewportIndex}
            activeViewportIndex={activeViewportIndex}
          />
        )}
        {error && <h2>{JSON.stringify(error)}</h2>}
      </DCMCloudComponentPlugin>
    );
  }
}

export default DCMCloudDicomPDFViewport;
