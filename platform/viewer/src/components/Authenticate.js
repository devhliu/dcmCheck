import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import Swal from "sweetalert2";
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
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
  const userData = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('token')
  if (token !== null && userData.stripeId) {
    history.push('/studylist')
  } else if (token !== null && userData.stripeId === undefined) {
    history.push('/package')
  }



  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      loginUser();
    }
  };

  const loginUser = async () => {
    if (Email == "") {
      Swal.fire({
        text: "Email is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    }
    else if (!validator.isEmail(Email)) {
      Swal.fire({
        text: "Email is not Valid",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    } else if (Password == "") {
      Swal.fire({
        text: "Password is required",
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    }

    else {
      setLoader(true);
      console.log("api hit")
      var data = {
        "email": Email,
        "password": Password,
      }

      var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      // setLoader(true);
      const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/users/signin`, requestOptions)
      const resp = await hello.json();
      console.log(resp);
      setLoader(false);
      if (resp.success == "true") {
        console.log('resp.success')
        // localStorage.setItem('studentToken', result.token);
        localStorage.setItem('userData', JSON.stringify(resp.data));
        localStorage.setItem('token', resp.token)
        if (resp.data.stripeId) {
          history.push('/studylist')
        } else {
          history.push('/package')
        }
        // history.push('/studylist')
        Swal.fire({
          title: "success",
          icon: "success",
          confirmButtonColor: "#ed2a26",
        });
      }
      else {
        Swal.fire({
          text: resp.error,
          icon: "error",
          confirmButtonColor: "#ed2a26",
        });
      }

    }
  }



  // Google RESPONSE
  const responseGoogle = (response) => {

    console.log("response", response)
    if (response.profileObj.email !== undefined && response.profileObj.name !== undefined) {
      var data = {
        'userName': response.profileObj.name,
        'email': response.profileObj.email,
      }
      singleSignIn(JSON.stringify(data));
      // console.log("response>>>", data);

    }
  }

  // Facebook RESPONSE
  const responseFacebook = (response) => {
    if (response.email !== undefined && response.name !== undefined) {
      var data = {
        'userName': response.email,
        'email': response.name,
      }
      singleSignIn(JSON.stringify(data));
      console.log("fb response>", data);

    }
  }

  const singleSignIn = async (signInData) => {

    setLoader(true);
    var requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: signInData,
    };
    const hello = await fetch(`https://dcm-cloud.herokuapp.com/api/v1/users/single`, requestOptions)
    const resp = await hello.json();
    console.log(resp);
    if (resp.success == "true") {
      // console.log('resp.success')
      setLoader(false);
      localStorage.setItem('userData', JSON.stringify(resp.user));
      localStorage.setItem('token', resp.token);
      if (resp.user.stripeId) {
        history.push('/studylist')
      } else {
        history.push('/package')
      }
      // history.push('/studylist')

      Swal.fire({
        title: "success",
        icon: "success",
        confirmButtonColor: "#ed2a26",
      });
    }
    else {
      Swal.fire({
        text: resp.error,
        icon: "error",
        confirmButtonColor: "#ed2a26",
      });
    }


  }

  return (
    <div>
      {loader == true ? <Loader fullPage loading /> : null}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={Email}
              onChange={(e) => handleInputChange(e, setEmail)}
              onKeyDown={(e) => handleKeypress(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              defaultValue={Password}
              onChange={(e) => handleInputChange(e, setPassword)}
              onKeyDown={(e) => handleKeypress(e)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginUser}
            >
              Sign In
            </Button>

            <Grid container justify='center' style={{ marginBottom: '2%' }}>
              <Grid item >
                <Typography style={{ color: '#858482' }} component="h6" variant="h6">
                  or
                </Typography>
              </Grid>
            </Grid>

            <Grid container justify='center' style={{ marginBottom: '3%' }}>
              <Grid item >
                <GoogleLogin
                  clientId="337927545229-ktj24t7be58qakm8gjc46666k1fduhtv.apps.googleusercontent.com"
                  render={renderProps => (
                    <button style={{ width: 400, height: 40, backgroundColor: '#3479c2', border: 'none', borderRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', color: 'white', cursor: 'pointer' }} type="button" onClick={renderProps.onClick} fullWidth={true} >Sign in with Google </button>
                  )}
                  buttonText="Sign In with Google"
                  onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>

            </Grid>
            <Grid container justify='center' style={{ marginBottom: '3%' }}>
              <Grid item >
                <FacebookLogin
                  appId="345593520717212"
                  autoLoad={true}
                  fields="name,email,picture"
                  render={renderProps => (
                    <>

                      <button type='button' style={{ width: 400, height: 40, backgroundColor: '#12234d', border: 'none', borderRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', color: 'white', cursor: 'pointer' }} className='' onClick={renderProps.onClick}> Sign in with Facebook</button>
                    </>
                  )}

                  icon="fa-facebook"
                  // onClick={componentClicked}
                  callback={responseFacebook} />
              </Grid>
            </Grid>

            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <b>Don't have an account?</b>
                <Link to="/signUp" variant="body2">
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>

        </div>

      </Container>



    </div>
  )
}

export default Authenticate
