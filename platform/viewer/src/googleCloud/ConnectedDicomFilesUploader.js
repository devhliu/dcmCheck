import { connect } from 'react-redux';
import DicomFileUploaderModal from './DicomFileUploaderModal.js';
import DCMCloud from '@dcmcloud/core';

const isActive = a => a.active === true;

const mapStateToProps = state => {
  const activeServer = state.servers.servers.find(isActive);

  // TODO: Not sure I like this approach since it means we are recreating
  // this function every time redux changes
  const retrieveAuthHeaderFunction = () =>
    DCMCloud.DICOMWeb.getAuthorizationHeader(activeServer);

  return {
    retrieveAuthHeaderFunction,
    url: activeServer && activeServer.qidoRoot,
  };
};

const ConnectedDicomFileUploader = connect(
  mapStateToProps,
  null
)(DicomFileUploaderModal);

export default ConnectedDicomFileUploader;
