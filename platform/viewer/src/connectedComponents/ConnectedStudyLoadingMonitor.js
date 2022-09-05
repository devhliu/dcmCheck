import { connect } from 'react-redux';
import StudyLoadingMonitor from '../components/StudyLoadingMonitor.js';
import DCMCloud from '@dcmcloud/core';

const {
  setStudyLoadingProgress,
  clearStudyLoadingProgress,
} = DCMCloud.redux.actions;

const mapDispatchToProps = dispatch => {
  return {
    setStudyLoadingProgress: (progressId, progressData) => {
      dispatch(setStudyLoadingProgress(progressId, progressData));
    },
    clearStudyLoadingProgress: progressId => {
      dispatch(clearStudyLoadingProgress(progressId));
    },
  };
};

const ConnectedStudyLoadingMonitor = connect(
  null,
  mapDispatchToProps
)(StudyLoadingMonitor);

export default ConnectedStudyLoadingMonitor;
