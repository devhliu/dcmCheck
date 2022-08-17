window.config = {
  routerBasename: '/',
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot: 'https://app.dcmcloud.com/coreapi/react/WadoURI',
        qidoRoot: 'https://app.dcmcloud.com/coreapi/react/QidoRS',
        wadoRoot: 'https://app.dcmcloud.com/coreapi/react/WadoRS',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadouri',
        thumbnailRendering: 'wadouri',
        supportsFuzzyMatching: true,
      },
    ],
  },
  i18n: {
    LOCIZE_PROJECTID: 'a8da3f9a-e467-4dd6-af33-474d582a0294',
    LOCIZE_API_KEY: null, // Developers can use this to do in-context editing. DO NOT COMMIT THIS KEY!
    USE_LOCIZE: false,
  },
};
