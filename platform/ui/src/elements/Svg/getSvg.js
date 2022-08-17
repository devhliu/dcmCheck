import React from 'react';
// Svgs
import dcmcloudLogoText from './svgs/dcmcloud-logo-text.svg';
import dcmcloudLogoWrappedText from './svgs/dcmcloud-logo-wrapped-text.svg';

const SVGS = {
  'dcmcloud-logo-wrapped-text': dcmcloudLogoWrappedText,
  'dcmcloud-logo-text': dcmcloudLogoText,
};

/**
 * Return the matching SVG as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getSvg(key, props) {
  if (!key || !SVGS[key]) {
    return React.createElement('div', null, 'Missing SVG');
  }

  return React.createElement(SVGS[key], props);
}

export { SVGS };
