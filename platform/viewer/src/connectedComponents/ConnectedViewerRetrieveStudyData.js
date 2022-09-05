import { connect } from 'react-redux';
import ViewerRetrieveStudyData from './ViewerRetrieveStudyData.js';
import DCMCloud from '@dcmcloud/core';

const { clearViewportSpecificData, setStudyData } = DCMCloud.redux.actions;
const isActive = a => a.active === true;

const mapStateToProps = (state, ownProps) => {
  const activeServer = state.servers.servers.find(isActive);

  return {
    server: ownProps.server || activeServer,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStudyData: (StudyInstanceUID, data) => {
      dispatch(setStudyData(StudyInstanceUID, data));
    },
    clearViewportSpecificData: () => {
      dispatch(clearViewportSpecificData());
    },
  };
};

const ConnectedViewerRetrieveStudyData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRetrieveStudyData);

export default ConnectedViewerRetrieveStudyData;
