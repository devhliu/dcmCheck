import DCMCloudLogo from '../components/DCMCloudLogo/DCMCloudLogo.js';
import React from 'react';

const defaultContextValues = {
  createLogoComponentFn: React => DCMCloudLogo(),
};

const WhiteLabelingContext = React.createContext(defaultContextValues);

export default WhiteLabelingContext;
