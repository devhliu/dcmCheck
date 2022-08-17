import React from 'react';
import DCMCloudDicomHtmlSopClassHandler from './DCMCloudDicomHtmlSopClassHandler.js';
import { version } from '../package.json';

const Component = React.lazy(() => {
  return import('./DCMCloudDicomHtmlViewport');
});

const DCMCloudDicomHtmlViewport = props => {
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
  id: 'html',
  version,

  getViewportModule() {
    return DCMCloudDicomHtmlViewport;
  },
  getSopClassHandlerModule() {
    return DCMCloudDicomHtmlSopClassHandler;
  },
};
