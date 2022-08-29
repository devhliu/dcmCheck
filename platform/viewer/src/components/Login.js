import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import FacebookIcon from '@material-ui/icons/Facebook';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './login.css';
import DCMCloudLogo from './DCMCloudLogo/DCMCloudLogo';
// import facebookIcon from './socialIcons/f.png';

// OVERLAY LOADER
import { Loader } from 'react-overlay-loader';

// OVERLAY LOADER CSS
import 'react-overlay-loader/styles.css';

// Importing Google authentications
import GoogleLogin from 'react-google-login';

// Importing Facebook authentications
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from 'react-facebook-login';

// EMAIL VALIDATOR
import validator from 'validator';
import { baseUrl } from './baseUrl/BaseUrl';
// import BaseUrl from './baseUrl/BaseUrl';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Authenticate = () => {
  const classes = useStyles();

  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  if (token !== null && userData.stripeId) {
    // history.push('/DashboardPage')
    history.push('/Studylist');
  } else if (token !== null && userData.stripeId === undefined) {
    history.push('/package');
  }

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  };

  const loginUser = async () => {
    if (Email == '') {
      Swal.fire({
        text: 'Email is required',
        icon: 'error',
        confirmButtonColor: '#005b9a',
      });
    } else if (!validator.isEmail(Email)) {
      Swal.fire({
        text: 'Email is not Valid',
        icon: 'error',
        confirmButtonColor: '#005b9a',
      });
    } else if (Password == '') {
      Swal.fire({
        text: 'Password is required',
        icon: 'error',
        confirmButtonColor: '#005b9a',
      });
    } else {
      setLoader(true);
      console.log('api hit');
      var data = {
        email: Email,
        password: Password,
      };

      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      // setLoader(true);
      const hello = await fetch(
        `https://dcm-cloud.herokuapp.com/api/v1/users/signin`,
        requestOptions
      );
      // const hello = await fetch(`${baseUrl}api/v1/users/signin`, requestOptions)
      const resp = await hello.json();
      console.log(resp);
      setLoader(false);
      if (resp.success == 'true') {
        console.log('resp.success');
        // localStorage.setItem('studentToken', result.token);
        localStorage.setItem('userData', JSON.stringify(resp.data));
        localStorage.setItem('token', resp.token);
        if (resp.data.stripeId) {
          // history.push('/studylist')
          history.push('/DashboardPage/StudylistNew');
          // history.push('/DashboardPage')
        } else {
          history.push('/package');
        }
        // history.push('/studylist')
        Swal.fire({
          title: 'success',
          icon: 'success',
          confirmButtonColor: '#005b9a',
        });
      } else {
        Swal.fire({
          text: resp.error,
          icon: 'error',
          confirmButtonColor: '#005b9a',
        });
      }
    }
  };

  // Google RESPONSE
  const responseGoogle = response => {
    if (response.Lu.tf !== undefined && response.Lu.Bv !== undefined) {
      var data = {
        userName: response.Lu.tf,
        email: response.Lu.Bv,
      };
      singleSignIn(JSON.stringify(data));
      // console.log("response>>>", data);
    }
  };

  // Facebook RESPONSE
  const responseFacebook = response => {
    if (response.email !== undefined && response.name !== undefined) {
      var data = {
        userName: response.email,
        email: response.name,
      };
      singleSignIn(JSON.stringify(data));
      console.log('fb response>', data);
    }
  };

  const singleSignIn = async signInData => {
    setLoader(true);
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: signInData,
    };
    const hello = await fetch(
      `https://dcm-cloud.herokuapp.com/api/v1/users/single`,
      requestOptions
    );
    const resp = await hello.json();
    console.log(resp);
    if (resp.success == 'true') {
      // console.log('resp.success')
      setLoader(false);
      localStorage.setItem('userData', JSON.stringify(resp.user));
      localStorage.setItem('token', resp.token);
      if (resp.user.stripeId) {
        history.push('/studylist');
      } else {
        history.push('/package');
      }
      // history.push('/studylist')

      Swal.fire({
        title: 'success',
        icon: 'success',
        confirmButtonColor: '#ed2a26',
      });
    } else {
      Swal.fire({
        text: resp.error,
        icon: 'error',
        confirmButtonColor: '#ed2a26',
      });
    }
  };

  return (
    <>
      <div style={{ padding: '55px 0' }}>
        {loader == true ? <Loader fullPage loading /> : null}

        <Container component="main" maxWidth="xs" className="login_container">
          <CssBaseline />
          <Card
            style={{
              width: '100%',
              padding: '5% 7%',
              borderRadius: 6,
              marginTop: 30,
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
          >
            <div className={classes.paper}>
              {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> */}
              {/* <DCMCloudLogo /> */}
              <img
                src="/assets/header-logo.png"
                style={{ margin: 'auto 0' }}
                width={120}
                height={50}
              />
              {/* <img src={DCMLogo}></img> */}
              {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  defaultValue={Email}
                  onChange={e => handleInputChange(e, setEmail)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  defaultValue={Password}
                  onChange={e => handleInputChange(e, setPassword)}
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Button
                  style={{
                    padding: '3% 0',
                    fontSize: '18px',
                  }}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => loginUser()}
                >
                  Sign In
                </Button>

                <Grid container justify="center" style={{ marginBottom: '2%' }}>
                  <Grid item>
                    <Typography
                      style={{ color: '#858482' }}
                      component="h6"
                      variant="h6"
                    >
                      OR
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  style={{
                    marginBottom: '3%',
                    paddingLeft: '35%',
                    paddingTop: '3%',
                  }}
                >
                  <Grid item xs={12}>
                    <FacebookLogin
                      appId="345593520717212"
                      autoLoad={false}
                      fields="name,email,picture"
                      render={renderProps => (
                        <>
                          <img
                            style={{ cursor: 'pointer', marginRight: '3%' }}
                            onClick={renderProps.onClick}
                            src="assets/f.png"
                            width={50}
                            height={50}
                          />

                          {/* <button className='single_signIn_facebook_button' type='button' onClick={() => renderProps.onClick}> Sign in with Facebook</button> */}
                        </>
                      )}
                      icon="fa-facebook"
                      // onClick={componentClicked}
                      callback={responseFacebook}
                    />

                    <GoogleLogin
                      clientId="337927545229-ktj24t7be58qakm8gjc46666k1fduhtv.apps.googleusercontent.com"
                      render={renderProps => (
                        <>
                          <img
                            onClick={renderProps.onClick}
                            style={{ cursor: 'pointer' }}
                            src="assets/g.png"
                            width={50}
                            height={50}
                          />
                        </>
                        // <button className='single_signIn_google_button' onClick={renderProps.onClick} fullWidth={true} > </button>
                      )}
                      buttonText="Sign In with Google"
                      onSuccess={responseGoogle}
                      // onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                </Grid>
                {/* <Grid container justify='center' style={{ marginBottom: '3%' }}>
                <Grid item xs={12}>
                </Grid>
              </Grid> */}

                <Grid
                  container
                  style={{ marginTop: 20, justifyContent: 'center' }}
                >
                  {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                  <Grid item>
                    <p>
                      Don't have an account?
                      <Link to="/signUp" variant="body2">
                        <b> Sign Up</b>
                      </Link>
                    </p>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Authenticate;
