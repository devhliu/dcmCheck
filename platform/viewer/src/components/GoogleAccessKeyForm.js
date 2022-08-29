import React, { useState, useEffect } from 'react';
import { TabComponents } from '@ohif/ui';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';

import '../components/UserPreferences/AWSAccessKeyFields.styl';
import { makeStyles, useTheme } from '@material-ui/core';
import MiniDrawer from './DashboardPage';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStylesCardForAWS = makeStyles({
  root: {
    minWidth: '50%',
    // height: 500,
    padding: '30px 30px 20px 30px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
});

const GoogleAccessKeyForm = () => {
  // const [awsActive, setAwsActive] = useState(false);
  // const [gActive, setGActive] = useState(false);
  // const tabs = [
  //   {
  //     name: `AWS AccessKeys  ${awsActive ? '✅' : '✔'}`,
  //     Component: AWSFormField,
  //     customProps: {},
  //   },
  //   {
  //     name: `Googles AccessKeys  ${gActive ? '✅' : '✔'}`,
  //     Component: GoogleFormField,
  //     customProps: {},
  //   },
  // ];
  const AWSCardclasses = useStylesCardForAWS();

  return (
    <>
      <MiniDrawer>
        <div className="GoogleAccessKey_Div">
          <Card className={AWSCardclasses.root}>
            <h2 style={{ color: '#0a2142' }}>Connect Google Bucket</h2>
            <GoogleFormField />
          </Card>
        </div>
      </MiniDrawer>
    </>
  );
};

const GoogleConnect = () => {
  var GoogleAccessKeyId = document.getElementById('GoogleAccessKeyID').value;
  var GoogleSecretAccessKey = document.getElementById('GoogleSecretAccessKey')
    .value;
  var GoogleBucketName = document.getElementById('GoogleBucketName').value;
  var GoogledcmcAccessKey = document.getElementById('GoogleDCMCAccesskey')
    .value;
  //var GooglebucketType = document.getElementById('GoogleBucketType').value;
  var GooglebucketType = 'google';
  localStorage.setItem('GoogleAccessKeyID', GoogleAccessKeyId);
  localStorage.setItem('GoogleSecretAccessKey', GoogleSecretAccessKey);
  localStorage.setItem('GoogleBucketName', GoogleBucketName);
  localStorage.setItem('GoogleDCMCAccesskey', GoogledcmcAccessKey);
  localStorage.setItem('GoogleBucketType', GooglebucketType);

  CheckConnectivityMainGoogle();
};

export default GoogleAccessKeyForm;

const GoogleFormField = () => {
  useEffect(() => {
    // Update the document title using the browser API
    CheckConnectivityMainGoogle();
  });
  return (
    <div className="access-field-container">
      <Grid container>
        <Grid xs={6} style={{ paddingRight: 10 }}>
          <>
            <label className="field-label" htmlFor="fname">
              Google AccessKey ID
            </label>
            {/* <input
                id="GoogleAccessKeyID"
                type="text"
                className="form-control access-field"
                onChange={() => { }}
                placeholder="AccessKey Id"
              /> */}
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Google AccessKey Id"
              type="text"
              id="GoogleAccessKeyID"
              autoComplete="current-password"
              size="small"
              onChange={() => {}}
            />
          </>
        </Grid>
        <Grid xs={6}>
          <>
            <label className="field-label" htmlFor="fname">
              Google Secret Access Key
            </label>

            {/* <input
                id="GoogleSecretAccessKey"
                type="text"
                className="form-control access-field"
                onChange={() => { }}
                placeholder="Secret Access Key"
              /> */}
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Google Secret Access Key"
              type="text"
              id="GoogleSecretAccessKey"
              autoComplete="current-password"
              size="small"
              onChange={() => {}}
            />
          </>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={6} style={{ paddingRight: 10 }}>
          <>
            <label className="field-label" htmlFor="fname">
              Google Bucket Name
            </label>

            {/* <input
                id="GoogleBucketName"
                type="text"
                className="form-control access-field"
                onChange={() => { }}
                placeholder="Bucket Name"
              /> */}
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Google Bucket Name"
              type="text"
              id="GoogleBucketName"
              autoComplete="current-password"
              size="small"
              onChange={() => {}}
            />
          </>
        </Grid>
        <Grid xs={6}>
          <>
            <label className="field-label" htmlFor="fname">
              DCMC AccessKey
            </label>

            {/* <input
                id="GoogleDCMCAccesskey"
                type="text"
                className="form-control access-field"
                onChange={() => { }}
                placeholder="DCMC AccessKey"
              /> */}
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="DCMC Access Key"
              type="text"
              id="GoogleDCMCAccesskey"
              autoComplete="current-password"
              size="small"
              onChange={() => {}}
            />
          </>
        </Grid>
      </Grid>
      <>
        <input
          id="GoogleBucketType"
          type="hidden"
          value="google"
          className="form-control access-field"
          onChange={() => {}}
        />
      </>
      <div className="connect-btn-container">
        <button className="connect-btn" id="gconnect" onClick={GoogleConnect}>
          <b>Connect</b>
        </button>
      </div>
    </div>
  );
};

function CheckConnectivityMainGoogle() {
  var AccessKeyId = localStorage.getItem('GoogleAccessKeyID');
  var SecretAccessKey = localStorage.getItem('GoogleSecretAccessKey');
  var BucketName = localStorage.getItem('GoogleBucketName');
  var DcmcAccessKey = localStorage.getItem('GoogleDCMCAccesskey');
  var bucketType = localStorage.getItem('GoogleBucketType');

  document.getElementById('GoogleAccessKeyID').value = AccessKeyId;
  document.getElementById('GoogleSecretAccessKey').value = SecretAccessKey;
  document.getElementById('GoogleBucketName').value = BucketName;
  document.getElementById('GoogleDCMCAccesskey').value = DcmcAccessKey;
  document.getElementById('GoogleBucketType').value = bucketType;

  var data = {
    bucketname: BucketName,
    AccessKeyId: AccessKeyId,
    SecretAccessKey: SecretAccessKey,
    DCMCAccessKey: DcmcAccessKey,
    BucketType: bucketType,
  };

  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // STOP! Do not add the following header!
      // 'Content-Type': 'multipart/form-data'
    }),
    body: JSON.stringify(data),
  };
  // fetch('https://app.dcmcloud.com/api/files/CheckConnectivity?BucketName=' + BucketName + '&Accesskey=' + AccessKeyId + '&SecretAccessKey=' + SecretAccessKey + '&bucketType=google&dcmcAccessKey=eWF2b3ktMjFhNmQuYXBwc3BvdC5jb21fZGNtY2xvdWQ=', requestOptions)
  fetch('https://app.dcmcloud.com/api/files/CheckConnectivity', requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data == true) {
        //setAwsActive(true);
        document.getElementById('gconnect').style.background = 'green';
      } else {
        //setAwsActive(false);
        document.getElementById('gconnect').style.background = 'red';
      }
    });
}
