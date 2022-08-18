import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2";
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import './login.css'

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
import DCMCloudLogo from './DCMCloudLogo/DCMCloudLogo';

const SignUp = () => {

  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'))
  if (userData !== null) {
    history.push('/studylist')
  }

  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event, func) => {
    func(event.target.value);
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      signupUser();
    }
  };

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const signupUser = async () => {
    if (UserName == "") {
      Swal.fire({
        text: "User Name is required",
        icon: "error",
        confirmButtonColor: "#005b9a",
      })
    } else if (Email == "") {
      Swal.fire({
        text: "Email is required",
        icon: "error",
        confirmButtonColor: "#005b9a",
      });
    }
    else if (!validator.isEmail(Email)) {
      Swal.fire({
        text: "Email is not Valid",
        icon: "error",
        confirmButtonColor: "#005b9a",
      });
    }
    else if (!Email.match(mailformat)) {
      Swal.fire({
        text: "Email is  inValid",
        icon: "error",
        confirmButtonColor: "#005b9a",
      });

    }
    else if (Password == "") {
      Swal.fire({
        text: "Password is required",
        icon: "error",
        confirmButtonColor: "#005b9a",
      });
    } else if (ConfirmPassword == "") {
      Swal.fire({
        text: "Confirm Password is required",
        icon: "error",
        confirmButtonColor: "#005b9a",
      });
    }
    else if (ConfirmPassword != Password) {
      Swal.fire({
        text: "Password does not match",
        icon: "warning",
        confirmButtonColor: "#005b9a",
      });
    }
    else {
      setLoader(true);
      console.log("api hit")
      var data = {
        'userName': UserName,
        "email": Email,
        "password": ConfirmPassword,
      }

      var requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const hello = await fetch(`${baseUrl}api/v1/users`, requestOptions)
      const resp = await hello.json();
      setLoader(true);
      console.log(resp);
      // console.log(resp)
      if (resp.success == "true") {

        // localStorage.setItem('studentToken', result.token);
        // localStorage.setItem('studentData', JSON.stringify(result.user));
        Swal.fire({
          title: "success",
          text: "Account created successfully",
          icon: "success",
          confirmButtonColor: "#005b9a",
        });
        setUserName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
      else {
        Swal.fire({
          text: resp.error,
          icon: "error",
          confirmButtonColor: "#005b9a",
        });
      }
      setLoader(false);
    }
  }

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

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
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

  const classes = useStyles();

  // Google RESPONSE
  const responseGoogle = (response) => {

    if (response.Lu.tf !== undefined && response.Lu.Bv !== undefined) {
      var data = {
        'userName': response.Lu.tf,
        'email': response.Lu.Bv,
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
        confirmButtonColor: "#005b9a",
      });
    }
    else {
      Swal.fire({
        text: resp.error,
        icon: "error",
        confirmButtonColor: "#005b9a",
      });
    }


  }

  return (
    <div>
      {loader == true ? <Loader fullPage loading /> : null}
      <Container component="main" maxWidth="xs" className='signup_container' style={{ paddingBottom: '1%' }}>
        <CssBaseline />
        <Card style={{ width: '750px', padding: '6% 14%', borderRadius: 6, marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Sign Up
            </Typography> */}
            <DCMCloudLogo />
            <form className={classes.form} noValidate>
              {/* Username */}
              <Grid spacig={2} container style={{
                marginBottom: '0%',
              }}>
                <Grid xs={6} style={{ paddingRight: '2%' }}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="usename"
                    label="Username"
                    name="name"
                    autoComplete="username"
                    autoFocus
                    value={UserName}
                    onChange={(e) => handleInputChange(e, setUserName)}
                    onKeyDown={(e) => handleKeypress(e)}

                  />

                </Grid>
                {/* <Grid xs={1}></Grid> */}
                <Grid xs={6} >
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
                    value={Email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    onKeyDown={(e) => handleKeypress(e)}
                  />

                </Grid>
              </Grid>
              {/* EMAIL */}
              {/* PASSWORD */}
              <Grid container style={{ marginBottom: '0%' }}>
                <Grid item xs={6} lg={6} style={{ paddingRight: '2%' }}>
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
                    value={Password}
                    onChange={(e) => handleInputChange(e, setPassword)}
                    onKeyDown={(e) => handleKeypress(e)}
                  />

                </Grid>
                <Grid item xs={6} lg={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    name="confirm-password"
                    label="Confirm-Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="Confirm-password"
                    value={ConfirmPassword}
                    onChange={(e) => handleInputChange(e, setConfirmPassword)}
                    onKeyDown={(e) => handleKeypress(e)}
                  />

                </Grid>
              </Grid>
              {/* CONFIRM-PASSWORD */}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                style={{
                  padding: '2% 0',
                  fontSize: '18px'
                }}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={signupUser}
                disabled={loader}
              >
                Sign Up
              </Button>


              <Grid container justify='center' style={{ marginBottom: 'auto 2%' }}>
                <Grid item >
                  <Typography style={{ color: '#858482' }} component="h6" variant="h6">
                    OR
                  </Typography>
                </Grid>
              </Grid>

              <Grid container justify='center' style={{ marginBottom: '1%', paddingLeft: '41%', paddingTop: '2%' }}>
                <Grid item xs={12} >
                  <FacebookLogin
                    appId="345593520717212"
                    autoLoad={true}
                    fields="name,email,picture"
                    render={renderProps => (
                      <>
                        <img style={{ cursor: 'pointer', marginRight: '3%' }} onClick={renderProps.onClick} src='assets/f.png' width={50} height={50} />
                        {/* <button className='single_signIn_facebook_button' type='button' onClick={renderProps.onClick}>
                          Sign in with Facebook</button> */}
                      </>
                    )}

                    icon="fa-facebook"
                    // onClick={componentClicked}
                    callback={responseFacebook} />
                  <GoogleLogin
                    clientId="337927545229-ktj24t7be58qakm8gjc46666k1fduhtv.apps.googleusercontent.com"
                    render={renderProps => (
                      <>
                        <img onClick={renderProps.onClick} style={{ cursor: 'pointer' }} src='assets/g.png' width={50} height={50} />
                      </>
                      // <button className='single_signIn_google_button' onClick={renderProps.onClick} fullWidth={true} >Sign in with Google </button>
                    )}
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />

                </Grid>

              </Grid>
              {/* <Grid container justify='center' style={{ marginBottom: '3%' }}>
                <Grid item xs={12} >
                </Grid>
              </Grid> */}



              <Grid container style={{ marginTop: 20, justifyContent: 'center' }}>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}

                <Grid item>
                  <p>Already have an account?
                    <Link to="/" variant="body2">
                      <b> Sign In</b>
                    </Link>

                  </p>
                </Grid>
              </Grid>
            </form>
          </div>

        </Card>
        {/* <Box mt={8}>
          <Copyright />
        </Box> */}
      </Container>

    </div>
  )
}

export default SignUp
