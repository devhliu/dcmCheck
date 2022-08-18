import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StudyListRouting from '../studylist/StudyListRouting';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ListIcon from '@material-ui/icons/List';
import BackupIcon from '@material-ui/icons/Backup';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import WifiIcon from '@material-ui/icons/Wifi';
import HttpsIcon from '@material-ui/icons/Https';
import { Link } from 'react-router-dom';
import ViewerLocalFileData from '../connectedComponents/ViewerLocalFileData';
import UploadFile from './UserPreferences/UploadFile';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AWSAccessKeyFields from './UserPreferences/AWSAccessKeyFields';
import ReactComponent from './ReactComponent'
import AngularComponent from './AngularComponent'
import HTMLComponent from './HTMLComponent'
import AWSAccessKeyForm from './AWSAccessKeyForm';
import GoogleAccessKeyForm from './GoogleAccessKeyForm';
import DCMCloudLogo from './DCMCloudLogo/DCMCloudLogo';

// DROPDOWN FOR LOGOUT
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import StorageIcon from '@material-ui/icons/Storage';
import Authenticate from './Login';
import ViewerLocalFileDataNEW from './ViewerLocalFileDataNEW';
import { Layout } from './Layout';
import './DashboardPage.css'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';


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
  menuButton: {
    marginRight: 10,
  },
  menuButtonColor: {
    color: 'black',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    // background: "blue"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
    marginTop: '3%'
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    cursor: 'pointer',

  },
  background: {
    background: '#0a2142'
  },
  drawerItemColor: {
    color: 'white'
  }


}));

const useStylesCardForCloud = makeStyles({
  root: {
    minWidth: 475,
    height: 250
  },

});

const useStylesCardForAWS = makeStyles({
  root: {
    minWidth: '50%',
    height: 500,
    padding: '5px 30px 0 30px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },

});

// dropdown designn
const dropdownuseStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const LogoutDropdownuseStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));



export default function MiniDrawer(props) {

  const history = useHistory()
  const location = useLocation()

  const userData = JSON.parse(localStorage.getItem('userData'))
  // console.log("userData._id GET from Local >>", userData._id)
  const token = localStorage.getItem('token')

  const dropdownclasses = dropdownuseStyles();
  const CloudCardclasses = useStylesCardForCloud();
  const AWSCardclasses = useStylesCardForAWS();
  const LogoutDropdownclasses = LogoutDropdownuseStyles();



  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dropdownOpen1, setdropdownOpen1] = React.useState(false);

  const handleClickDropdown1 = () => {
    setdropdownOpen1(!dropdownOpen1);
  };

  const [dropdownOpen2, setdropdownOpen2] = React.useState(false);

  const handleClickDropdown2 = () => {
    setdropdownOpen2(!dropdownOpen2);
  };

  const [dropdownOpen3, setdropdownOpen3] = React.useState(false);

  const handleClickDropdown3 = () => {
    setdropdownOpen3(!dropdownOpen3);
  };

  const [Path, setPath] = React.useState('/DashboardPages')

  // Navbar DROPDOWN for Logout
  const [OpenLogout, setOpenLogout] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpenLogout((prevOpenLogout) => !prevOpenLogout);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenLogout(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenLogout(false);
    }
  }

  // return focus to the button when we transitioned from !openLogout -> openLogout
  const prevOpenLogout = React.useRef(OpenLogout);
  React.useEffect(() => {
    if (prevOpenLogout.current === true && OpenLogout === false) {
      anchorRef.current.focus();
    }

    prevOpenLogout.current = OpenLogout;
  }, [OpenLogout]);

  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    history.push('/')
  }

  useEffect(() => {
    setPath('/DashboardPage')
    getStudyListData()
    userDetail()
    if (userData.stripeId) {
      if (userData.monthly) {

        StripeMonthlyDetails()
      }
      else {
        StripePayAsYouGoDetails()
      }
    }
  }, [])

  const [startTime, setstartTime] = React.useState('')
  const [endTime, setendTime] = React.useState('')
  const [StripeDescription, setStripeDescription] = React.useState('')
  const [CompareEndTime, setCompareEndTime] = React.useState('')
  const [Status, setStatus] = React.useState('')
  const [StripeCount, setStripeCount] = React.useState('')
  const [StripeId, setStripeId] = React.useState('')

  const StripeMonthlyDetails = async () => {

    // setLoader(true);
    console.log("api hit")
    var data = {
      "customer": userData.stripeId
    }

    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    // setLoader(true);
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/customer`, requestOptions)
    const resp = await hello.json();
    console.log(resp);

    // setLoader(false);
    if (resp.invoice) {
      console.log('resp.success')
      // console.log(resp.invoice.lines.data[0].description);
      // console.log(resp.invoice.lines.data[0].period.start);
      // console.log(resp.invoice.lines.data[0].period.end);
      setStatus(resp.invoice.status)

      setStripeDescription(resp.invoice.lines.data[0].description)
      // str.split('1 x ')[1]

      let unix_timestamp1 = resp.invoice.lines.data[0].period.start
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date1 = new Date(unix_timestamp1 * 1000);
      console.log(date1)
      setstartTime(`${date1.getMonth()} ${date1.getDate()}`)

      let unix_timestamp2 = resp.invoice.lines.data[0].period.end
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date2 = new Date(unix_timestamp2 * 1000);
      console.log(date2)
      setCompareEndTime(date2)

      console.log("curr date", new Date() < date2)
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

      let monthName = month[date2.getMonth()];
      setendTime(`Valid Till: ${date2.getDate()}  ${monthName}  ${date2.getFullYear()}`)

    }
    else {

      console.log(resp.error);
      // Swal.fire({
      //   text: resp.error,
      //   icon: "error",
      //   confirmButtonColor: "#ed2a26",
      // });
    }


  }

  var subscribePack = (
    <Link style={{ fontSize: 14, color: 'whitesmoke' }} to='/package'>SUBSCRIBE PACKAGE</Link>
  )
  const StripePayAsYouGoDetails = async () => {

    // setLoader(true);
    console.log("api hit")
    var data = {
      "customer": userData.stripeId
    }

    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    // setLoader(true);
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/stripe/customer`, requestOptions)
    const resp = await hello.json();
    console.log(resp);

    // setLoader(false);
    if (resp.invoice) {
      console.log('resp.success')
      // console.log(resp.invoice.lines.data[0].description);
      // console.log(resp.invoice.lines.data[0].period.start);
      // console.log(resp.invoice.lines.data[0].period.end);
      // userData.count


      setStatus(resp.invoice.status)
      setStripeDescription(resp.invoice.lines.data[0].description)

      let unix_timestamp2 = resp.invoice.lines.data[0].period.end
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date2 = new Date(unix_timestamp2 * 1000);
      console.log(date2)
      setCompareEndTime(date2)

      console.log("curr date", new Date() < date2)
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

      let monthName = month[date2.getMonth()];
      setendTime(`Valid Till: ${date2.getDate()}  ${monthName}  ${date2.getFullYear()}`)

    }
    else {

      console.log(resp.error);
      // Swal.fire({
      //   text: resp.error,
      //   icon: "error",
      //   confirmButtonColor: "#ed2a26",
      // });
    }


  }
  // console.log(">>>>>", startTime, endTime)

  const userDetail = async () => {
    var data = {
      "_id": userData._id
    }
    // console.log("userData._id>>", userData._id)
    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    // setLoader(true);
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/users/getSpecific`, requestOptions)
    const resp = await hello.json();
    localStorage.setItem('userData', JSON.stringify(resp.data))
    // setStripeCount(`${resp.data.count} uploads remaining`)
    setStripeCount(parseInt(resp.data.count))
    setStripeId(resp.data.stripeId)
    console.log(resp);
  }

  const [ListData, setListData] = React.useState([])
  const getStudyListData = async () => {
    if (JSON.parse(localStorage.getItem("StudyListData")) != null) {
      setListData(JSON.parse(localStorage.getItem("StudyListData")))
    }
  }

  setTimeout(() => {
    // userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(">>>>", userData.count)

    getStudyListData()

  }, 2000)

  return (
    <>
      {
        token ?

          <div className={classes.root}>

            <CssBaseline />

            <AppBar
              // position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarBackground]: true,
                [classes.appBarShift]: open,
              })}
            >
              {userData.monthly ?
                <div style={{ height: 24, display: 'flex', backgroundColor: '#005b9a', justifyContent: 'center', paddingTop: 4 }}>
                  {StripeDescription}  {endTime.toString()}
                </div>
                :
                ListData.length > StripeCount && StripeId != "free" ?
                  <div style={{ height: 24, display: 'flex', backgroundColor: '#005b9a', justifyContent: 'center', paddingTop: 4 }}>
                    <span>PayAsYouGo 0 uploads remaining</span>&nbsp;<strong>{subscribePack}</strong>

                  </div>
                  :
                  ListData.length <= StripeCount && StripeId != "free" ?
                    <div style={{ height: 24, display: 'flex', backgroundColor: '#005b9a', justifyContent: 'center', paddingTop: 4 }}>
                      <span>PayAsYouGo {StripeCount - ListData.length} uploads remaining</span>&nbsp;<strong>{subscribePack}</strong>

                    </div>
                    :
                    <div style={{ height: 24, display: 'flex', backgroundColor: '#005b9a', justifyContent: 'center', paddingTop: 4 }}>
                      <span>Free Package {StripeCount - ListData.length} uploads remaining</span>&nbsp;<strong>{subscribePack}</strong>

                    </div>
              }
              <Toolbar>
                {/* <Grid container direction="row" spacing={1}>
            <Grid item sm={1}>

            </Grid>
            <Grid sm={10}>
            </Grid>
            <Grid item xs={1} style={{ paddingLeft: '60px' }}>
            </Grid>
            <Grid item xs={1} style={{ paddingLeft: '25px' }}>
            </Grid>
          </Grid> */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, classes.menuButtonColor, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <DCMCloudLogo />
                  <Button
                    ref={anchorRef}
                    aria-controls={OpenLogout ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    style={{ marginTop: '0%', borderRadius: '50%' }}
                  >
                    <Avatar alt={userData.userName} src="/static/images/avatar/1.jpg" className={classes.large} />

                  </Button>
                  <Popper style={{ marginRight: '3%', marginTop: '0px' }} open={OpenLogout} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={OpenLogout} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              {/* <MenuItem onClick={() => { handleClose() }}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem> */}
                              <MenuItem onClick={() => { handleLogout(), handleClose() }}>Logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                </div>


              </Toolbar>
            </AppBar>
            <Drawer

              variant="permanent"
              className={clsx(classes.drawer, {

                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,


              })}
              classes={{
                paper: clsx({
                  [classes.drawerItemColor]: true,
                  [classes.background]: true,
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: 'white' }} />}
                </IconButton>
              </div>
              <Divider />
              <List style={{ marginTop: 30 }}>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
                <Link to="/Studylist" style={{ color: 'white' }}>
                  <ListItem button onClick={() => { setPath('/DashboardPage'), setOpen(true) }}>
                    <ListItemIcon> <ReceiptOutlinedIcon style={{ color: 'white' }} /> </ListItemIcon>
                    <ListItemText primary={'My List'} />
                  </ListItem>
                </Link>
                {/* <ListItem button >
              <ListItemIcon> <MailIcon /> </ListItemIcon>
              <ListItemText primary={'Upload Dicom'} />
            </ListItem> */}

                {/* FIRST DropDown......... */}
                <ListItem button onClick={handleClickDropdown1}>
                  <ListItemIcon>
                    <BackupIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Upload Dicom" />
                  {dropdownOpen1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={dropdownOpen1} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <Link to="/DashboardPage/local" onClick={() => { setPath('/DashboardPage/local') }}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown1}>

                        <ListItemIcon><StorageIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Local" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>
                    <Link to="/DashboardPage/UploadFile" onClick={() => { setPath('/DashboardPage/UploadFile') }}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown1}>

                        <ListItemIcon><CloudQueueIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Cloud" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>

                  </List>
                </Collapse>

                {/* SECOND DropDown......... */}
                <ListItem button onClick={handleClickDropdown2}>
                  <ListItemIcon>
                    <HttpsIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Connection" />
                  {dropdownOpen2 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={dropdownOpen2} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/DashboardPage/AWSAccessKey" onClick={() => setPath('/DashboardPage/AWSAccessKey')}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown2}>

                        <ListItemIcon>
                          <img src='assets/aws.png' width={30} />

                        </ListItemIcon>
                        <ListItemText primary="Aws" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>
                    <Link to="/DashboardPage/GoogleAccessKey" onClick={() => setPath('/DashboardPage/GoogleAccessKey')}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown2}>

                        <ListItemIcon>
                          <img src='assets/google.png' width={25} />
                        </ListItemIcon>
                        <ListItemText primary="Google" style={{ color: 'white' }} />
                      </ListItem>

                    </Link>

                  </List>
                </Collapse>

                {/* THIRD DropDown......... */}
                <ListItem button onClick={handleClickDropdown3}>
                  <ListItemIcon>
                    {/* <DeveloperModeIcon style={{ color: 'white' }} /> */}
                    <img src='assets/api.png' width={25} />
                  </ListItemIcon>
                  <ListItemText primary="API" />
                  {dropdownOpen3 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={dropdownOpen3} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/DashboardPage/ReactComponent" onClick={() => setPath('/ReactComponent')}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown3}>

                        <ListItemIcon>
                          <img src='assets/react.png' width={25} />
                        </ListItemIcon>
                        <ListItemText primary="React" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>
                    <Link to="/DashboardPage/AngularComponent" onClick={() => setPath('/AngularComponent')}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown3}>

                        <ListItemIcon>
                          <img src='assets/angular.png' width={25} />
                        </ListItemIcon>
                        <ListItemText primary="Angular" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>
                    <Link to="/DashboardPage/HTMLComponent" onClick={() => setPath('/HTMLComponent')}>
                      <ListItem button className={classes.nested} onClick={handleClickDropdown3}>

                        <ListItemIcon>
                          <img src='assets/html.png' width={25} />
                        </ListItemIcon>
                        <ListItemText primary="HTML" style={{ color: 'white' }} />
                      </ListItem>
                    </Link>

                  </List>
                </Collapse>


              </List>
              {/* <Divider /> */}
              {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {/* <Layout/> */}
              {props.children}
            </main>


            {/* {Path == '/DashboardPage' && (
              <StudyListRouting />
            )}
            {Path == '/DashboardPage/local' && (
              <ViewerLocalFileDataNEW />
            )}
            {Path == '/DashboardPage/UploadFile' && (
              <div style={{ width: '100%', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px' }}>
                <Card className={CloudCardclasses.root} style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: 20 }}>
                  <UploadFile />
                </Card>

              </div>
            )}
            {Path == '/DashboardPage/AWSAccessKey' && (
              <div style={{ width: '100%', height: '400px', paddingRight: '5%', paddingLeft: '5%', marginTop: '30px' }}>
                <Card className={AWSCardclasses.root}>
                  <AWSAccessKeyForm />
                </Card>

              </div>
            )}
            {Path == '/DashboardPage/GoogleAccessKey' && (
              <div style={{ width: '100%', height: '450px', paddingRight: '5%', paddingLeft: '5%', marginTop: '30px' }}>
                <Card className={AWSCardclasses.root}>
                  <GoogleAccessKeyForm />
                </Card>

              </div>
            )}
            {Path == '/ReactComponent' && (
              <div style={{ width: '100%', height: '450px', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px' }}>
                <ReactComponent />

              </div>
            )}
            {Path == '/AngularComponent' && (
              <div style={{ width: '100%', height: '350px', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px', marginBottom: '18%' }}>

                <AngularComponent />

              </div>
            )}
            {Path == '/HTMLComponent' && (
              <div style={{ width: '100%', height: '450px', paddingRight: '8%', paddingLeft: '8%', marginTop: '30px' }}>
                <HTMLComponent />

              </div>
            )} */}
          </div> :
          (history.push('/'))
      }
    </>
  );
}
