import { asyncComponent, retryImport } from '@ohif/ui';
import OHIF from '@ohif/core';

const { urlUtil: UrlUtil } = OHIF.utils;

// Dynamic Import Routes (CodeSplitting)
const IHEInvokeImageDisplay = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "IHEInvokeImageDisplay" */ './IHEInvokeImageDisplay.js'
    )
  )
);
const ViewerRouting = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "ViewerRouting" */ './ViewerRouting.js')
  )
);

const StudyListRouting = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "StudyListRouting" */ '../studylist/StudyListRouting.js'
    )
  )
);
const StandaloneRouting = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "ConnectedStandaloneRouting" */ '../connectedComponents/ConnectedStandaloneRouting.js'
    )
  )
);
// const ViewerLocalFileData = asyncComponent(() =>
//   retryImport(() =>
//     import(
//       /* webpackChunkName: "ViewerLocalFileData" */ '../connectedComponents/ViewerLocalFileData.js'
//     )
//   )
// );

const ViewerLocalFileData = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "ViewerLocalFileData" */ '../components/ViewerLocalFileDataNEW'
    )
  )
);
const Login = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "Authenticate" */ '../components/Login')
  )
);
const SignUp = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "SignUp" */ '../components/SignUp')
  )
);

const SuccessPage = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "SuccessPage" */ '../components/SuccessPage')
  )
);

const PackagePrice = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "PackagePrice" */ '../components/PackagePrice')
  )
);

const AWSAccessKeyForm = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "PackagePrice" */ '../components/AWSAccessKeyForm'
    )
  )
);
const GoogleAccessKeyForm = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "PackagePrice" */ '../components/GoogleAccessKeyForm'
    )
  )
);

const UploadFile = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "PackagePrice" */ '../components/UserPreferences/UploadFile'
    )
  )
);
const ReactComponent = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "PackagePrice" */ '../components/ReactComponent'
    )
  )
);
const AngularComponent = asyncComponent(() =>
  retryImport(() =>
    import(
      /* webpackChunkName: "PackagePrice" */ '../components/AngularComponent'
    )
  )
);
const HTMLComponent = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "PackagePrice" */ '../components/HTMLComponent')
  )
);
// const TemplatePage = asyncComponent(() =>
//   retryImport(() =>
//     import(/* webpackChunkName: "PackagePrice" */ '../components/TemplatePage')
//   )
// );

const StudylistNew = asyncComponent(() =>
  retryImport(() =>
    import(/* webpackChunkName: "PackagePrice" */ '../components/StudylistNew')
  )
);

const reload = () => window.location.reload();
// const keyaVal =
//   localStorage.getItem('AwsBucketName') +
//   '^' +
//   localStorage.getItem('AwsAccessKeyId') +
//   '^' +
//   localStorage.getItem('AwsSecretAccessKey');
// const keya = new Buffer.from(keyaVal).toString('base64');
const ROUTES_DEF = {
  default: {
    viewer: {
      path: '/viewer/:studyInstanceUIDs',
      component: ViewerRouting,
    },
    standaloneViewer: {
      path: '/viewer',
      component: StandaloneRouting,
    },

    signIn: {
      path: ['/signIn', '/'],
      component: Login,
    },
    signUp: {
      path: '/signUp',
      component: SignUp,
    },
    SuccessPage: {
      path: '/success',
      component: SuccessPage,
    },
    PackagePrice: {
      path: '/package',
      component: PackagePrice,
    },
    // TemplatePage: {
    //   path: '/template',
    //   component: TemplatePage,
    // },

    AWSAccessKeyForm: {
      path: '/DashboardPage/AWSAccessKey',
      component: AWSAccessKeyForm,
    },
    GoogleAccessKeyForm: {
      path: '/DashboardPage/GoogleAccessKey',
      component: GoogleAccessKeyForm,
    },

    UploadFile: {
      path: '/DashboardPage/UploadFile',
      component: UploadFile,
    },
    ReactComponent: {
      path: '/DashboardPage/ReactComponent',
      component: ReactComponent,
    },
    AngularComponent: {
      path: '/DashboardPage/AngularComponent',
      component: AngularComponent,
    },
    HTMLComponent: {
      path: '/DashboardPage/HTMLComponent',
      component: HTMLComponent,
    },

    // StudylistNew: {
    //   path: '/DashboardPage/StudylistNew',
    //   component: StudylistNew,
    // },

    list: {
      path: ['/DashboardPage/StudylistNew'],
      component: StudyListRouting,
      condition: appConfig => {
        return appConfig.showStudyList;
      },
    },

    // local: {
    //   path: '/local',
    //   component: ViewerLocalFileData,
    // },
    local: {
      path: '/DashboardPage/local',
      component: ViewerLocalFileData,
    },
    IHEInvokeImageDisplay: {
      path: '/IHEInvokeImageDisplay',
      component: IHEInvokeImageDisplay,
    },
  },
  gcloud: {
    viewer: {
      path:
        '/projects/:project/locations/:location/datasets/:dataset/dicomStores/:dicomStore/study/:studyInstanceUIDs',
      component: ViewerRouting,
      condition: appConfig => {
        return !!appConfig.enableGoogleCloudAdapter;
      },
    },
    list: {
      path:
        '/projects/:project/locations/:location/datasets/:dataset/dicomStores/:dicomStore',
      component: StudyListRouting,
      condition: appConfig => {
        const showList = appConfig.showStudyList;

        return showList && !!appConfig.enableGoogleCloudAdapter;
      },
    },
  },
};

const getRoutes = appConfig => {
  const routes = [];
  for (let keyConfig in ROUTES_DEF) {
    const routesConfig = ROUTES_DEF[keyConfig];

    for (let routeKey in routesConfig) {
      const route = routesConfig[routeKey];
      const validRoute =
        typeof route.condition === 'function'
          ? route.condition(appConfig)
          : true;

      if (validRoute) {
        routes.push({
          path: route.path,
          Component: route.component,
        });
      }
    }
  }

  return routes;
};

const parsePath = (path, server, params) => {
  let _path = path;
  const _paramsCopy = Object.assign({}, server, params);

  for (let key in _paramsCopy) {
    _path = UrlUtil.paramString.replaceParam(_path, key, _paramsCopy[key]);
  }

  return _path;
};

const parseViewerPath = (appConfig = {}, server = {}, params) => {
  let viewerPath = ROUTES_DEF.default.viewer.path;
  if (appConfig.enableGoogleCloudAdapter) {
    viewerPath = ROUTES_DEF.gcloud.viewer.path;
  }

  return parsePath(viewerPath, server, params);
};

const parseStudyListPath = (appConfig = {}, server = {}, params) => {
  let studyListPath = ROUTES_DEF.default.list.path;
  if (appConfig.enableGoogleCloudAdapter) {
    studyListPath = ROUTES_DEF.gcloud.list.path || studyListPath;
  }

  return parsePath(studyListPath, server, params);
};

export { getRoutes, parseViewerPath, parseStudyListPath, reload };
