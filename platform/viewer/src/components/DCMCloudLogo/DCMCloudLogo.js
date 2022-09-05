import './DCMCloudLogo.css';

import { Icon } from '@dcmcloud/ui';
import React from 'react';

function DCMCloudLogo() {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="header-brand"
      href="https://www.dcmcloud.com/"
    >
      {/* <img
        src="../../../public/assets/header-logo.png"
        alt="header logo"
        className="header-logo"
      /> */}
      <Icon name="dci-logo" className="header-logo-image" />
      {/* Logo text would fit smaller displays at two lines:
       *
       * Open Health
       * Imaging Foundation
       *
       * Or as `DCMCloud` on really small displays
       */}
      {/* <Icon name="dcmcloud-text-logo" className="header-logo-text" /> */}
    </a>
  );
}

export default DCMCloudLogo;
