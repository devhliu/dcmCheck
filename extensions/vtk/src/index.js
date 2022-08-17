import React from 'react';
import { asyncComponent, retryImport } from '@dcmcloud/ui';

import commandsModule from './commandsModule.js';
import toolbarModule from './toolbarModule.js';
import withCommandsManager from './withCommandsManager.js';
import { version } from '../package.json';
// This feels weird
// import loadLocales from './loadLocales';

const DCMCloudVTKViewport = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "DCMCloudVTKViewport" */ './DCMCloudVTKViewport.js'
    )
  )
);

const vtkExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'vtk',
  version,

  getViewportModule({ commandsManager, servicesManager }) {
    const ExtendedVTKViewport = props => (
      <DCMCloudVTKViewport
        {...props}
        servicesManager={servicesManager}
        commandsManager={commandsManager}
      />
    );
    return withCommandsManager(ExtendedVTKViewport, commandsManager);
  },
  getToolbarModule() {
    return toolbarModule;
  },
  getCommandsModule({ commandsManager, servicesManager }) {
    return commandsModule({ commandsManager, servicesManager });
  },
};

export default vtkExtension;

export { vtkExtension };

// loadLocales();
