import React from 'react';
import DCMCloudDicomPDFSopClassHandler from './DCMCloudDicomPDFSopClassHandler.js';
import { version } from '../package.json';

const Component = React.lazy(() => {
  return import('./ConnectedDCMCloudDicomPDFViewer');
});

const ConnectedDCMCloudDicomPDFViewer = props => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'pdf',
  version,
  getViewportModule() {
    return ConnectedDCMCloudDicomPDFViewer;
  },
  getSopClassHandlerModule() {
    return DCMCloudDicomPDFSopClassHandler;
  },
};
