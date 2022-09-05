import DCMCloud from '@dcmcloud/core';
import { connect } from 'react-redux';
import DCMCloudDicomPDFViewport from './DCMCloudDicomPDFViewport';

const { setViewportActive } = DCMCloud.redux.actions;

const mapStateToProps = (state, ownProps) => {
  const { activeViewportIndex } = state.viewports;
  return { activeViewportIndex };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { viewportIndex } = ownProps;

  return {
    setViewportActive: () => {
      dispatch(setViewportActive(viewportIndex));
    },
  };
};

const ConnectedDCMCloudDicomPDFViewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DCMCloudDicomPDFViewport);

export default ConnectedDCMCloudDicomPDFViewer;
