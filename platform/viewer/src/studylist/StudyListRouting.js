import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ConnectedStudyList from './ConnectedStudyList';
import useServer from '../customHooks/useServer';
import DCMCloud from '@dcmcloud/core';
import MiniDrawer from '../components/DashboardPage';

import { makeStyles, useTheme } from '@material-ui/core/styles';

// Contexts
import AppContext from '../context/AppContext';
import { useHistory } from "react-router-dom";
import { Layout } from '../components/Layout';
const { urlUtil: UrlUtil } = DCMCloud.utils;


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarBackground: {
    background: 'white'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },



}));


function StudyListRouting({ match: routeMatch, location: routeLocation }) {


  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('token')
  if (token === null) {
    history.push('/')
  }

  const {
    project,
    location,
    dataset,
    dicomStore,
    studyInstanceUIDs,
    seriesInstanceUIDs,
  } = routeMatch.params;
  const server = useServer({ project, location, dataset, dicomStore });
  const { appConfig = {} } = useContext(AppContext);

  const filters = UrlUtil.queryString.getQueryFilters(routeLocation);

  let studyListFunctionsEnabled = false;
  if (appConfig.studyListFunctionsEnabled) {
    studyListFunctionsEnabled = appConfig.studyListFunctionsEnabled;
  }

  return (
    <>
      <MiniDrawer >
        <ConnectedStudyList
          filters={filters}
          studyListFunctionsEnabled={studyListFunctionsEnabled}
        />

      </MiniDrawer>

    </>
  );
}

StudyListRouting.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(StudyListRouting);
