# Meteor Packages

### Commands (_dcmcloud-commands_)

### Core (_dcmcloud-core_)

## Cornerstone Package (_dcmcloud-cornerstone_)

This package contains a number of front-end libraries that help us build
web-based medical imaging applications.

These are:

- [dicomParser](https://github.com/cornerstonejs/dicomParser): A lightweight
  JavaScript library for parsing DICOM P10 byte streams in modern web browsers
  (IE10+), Node.js, and Meteor.

- [Cornerstone Core](https://github.com/cornerstonejs/cornerstone): A
  lightweight JavaScript library for displaying medical images in modern web
  browsers that support the HTML5 canvas element.

- [Cornerstone Tools](https://github.com/cornerstonejs/cornerstoneTools): A
  library built on top of cornerstone that provides a set of common tools needed
  in medical imaging to work with images and stacks of images

- [Cornerstone Math](https://github.com/cornerstonejs/cornerstoneMath): Math and
  computational geometry functionality for Cornerstone

- [Cornerstone WADO Image Loader](https://github.com/cornerstonejs/cornerstoneWADOImageLoader):
  A Cornerstone Image Loader for DICOM P10 instances over HTTP. This can be used
  to integrate cornerstone with WADO-URI servers or any other HTTP based server
  that returns DICOM P10 instances (e.g. Orthanc or custom servers).

- [Hammer.js](https://github.com/hammerjs/hammer.js): A JavaScript library for
  multi-touch gestures

### Design (_dcmcloud-design_)

### DICOM Services (_dcmcloud-dicom-services_)

It contains a number of helper functions for retrieving common value types (e.g.
JSON, patient name, image frame) from a DICOM image. This package is for
server-side usage.

### Hanging Protocols (_dcmcloud-hanging-protocols_)

### Header (_dcmcloud-header_)

### Hotkeys (_dcmcloud-hotkeys_)

### Lesion Tracker (_dcmcloud-lesiontracker_)

This package stores all of the oncology-specific tools and functions developed
for the Lesion Tracker application. Here we store, for example, the Target
measurement and Non-target pointer tools that are used to monitor tumour burden
over time.

This package also stores Meteor components for the interactive lesion table used
in the Lesion Tracker, and dialog boxes for the callbacks attached to the Target
and Non-target tools.

### Logging (_dcmcloud-log_)

### Logging (_dcmcloud-measurements_)

### Metadata (_dcmcloud-metadata_)

### Polyfilling Functionality (_dcmcloud-polyfill_)

### Select Tree UI (_dcmcloud-select-tree_)

### Server Settings UI (_dcmcloud-servers_)

### Studies (_dcmcloud-studies_)

### Study List UI (_dcmcloud-study-list_)

### Common Themes (_dcmcloud-themes-common_)

### Theming (_dcmcloud-themes_)

### User Management (_dcmcloud-user-management_)

### User (_dcmcloud-user_)

### Basic Viewer Components (_dcmcloud-viewerbase_)

This is the largest package in the repository. It holds a large number of
re-usable Meteor components that are used to build both the DCMCloud Viewer and
Lesion Tracker.

### WADO Proxy (_dcmcloud-wadoproxy_)

Proxy for CORS
