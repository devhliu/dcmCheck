/**
 * Entry point for development and production PWA builds.
 * Packaged (NPM) builds go through `index-umd.js`
 */

import 'regenerator-runtime/runtime';

import App from './App.js';
import React from 'react';
import ReactDOM from 'react-dom';
// test

/**
 * EXTENSIONS
 * =================
 *
 * Importing and modifying the extensions our app uses HERE allows us to leverage
 * tree shaking and a few other niceties. However, by including them here they become
 * "baked in" to the published application.
 *
 * Depending on your use case/needs, you may want to consider not adding any extensions
 * by default HERE, and instead provide them via the extensions configuration key or
 * by using the exported `App` component, and passing in your extensions as props using
 * the defaultExtensions property.
 */
import DCMCloudVTKExtension from '@dcmcloud/extension-vtk';
import DCMCloudDicomHtmlExtension from '@dcmcloud/extension-dicom-html';
import DCMCloudDicomSegmentationExtension from '@dcmcloud/extension-dicom-segmentation';
import DCMCloudDicomRtExtension from '@dcmcloud/extension-dicom-rt';
import DCMCloudDicomMicroscopyExtension from '@dcmcloud/extension-dicom-microscopy';
import DCMCloudDicomPDFExtension from '@dcmcloud/extension-dicom-pdf';
//import DCMCloudDicomTagBrowserExtension from '@dcmcloud/extension-dicom-tag-browser';
// Add this for Debugging purposes:
//import DCMCloudDebuggingExtension from '@dcmcloud/extension-debugging';
import { version } from '../package.json';

/*
 * Default Settings
 */
let config = {};

if (window) {
  config = window.config || {};
  window.version = version;
}

const appProps = {
  config,
  defaultExtensions: [
    DCMCloudVTKExtension,
    DCMCloudDicomHtmlExtension,
    DCMCloudDicomMicroscopyExtension,
    DCMCloudDicomPDFExtension,
    DCMCloudDicomSegmentationExtension,
    DCMCloudDicomRtExtension,
    //DCMCloudDebuggingExtension,
    //DCMCloudDicomTagBrowserExtension,
  ],
};

/** Create App */
const app = React.createElement(App, appProps, null);

/** Render */
ReactDOM.render(app, document.getElementById('root'));
