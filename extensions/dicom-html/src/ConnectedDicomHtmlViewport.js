import DCMCloud from '@dcmcloud/core';
import { connect } from 'react-redux';
import DicomHtmlViewport from './DicomHtmlViewport';

const { setViewportActive } = DCMCloud.redux.actions;

const mapStateToProps = (state, ownProps) => {
  const { viewportIndex, byteArray } = ownProps;
  const { activeViewportIndex } = state.viewports;

  return {
    viewportIndex,
    activeViewportIndex,
    byteArray,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { viewportIndex } = ownProps;

  return {
    setViewportActive: () => {
      dispatch(setViewportActive(viewportIndex));
    },
  };
};

const ConnectedDicomHtmlViewport = connect(
  mapStateToProps,
  mapDispatchToProps
)(DicomHtmlViewport);

export default ConnectedDicomHtmlViewport;
