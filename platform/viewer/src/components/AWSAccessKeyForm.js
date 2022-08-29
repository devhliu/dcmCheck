import React, { useState, useEffect } from 'react';
import { TabComponents } from '@ohif/ui';
import '../components/UserPreferences/AWSAccessKeyFields.styl';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import MiniDrawer from './DashboardPage';
import { makeStyles, useTheme } from '@material-ui/core';
import './AWSandGoogleAccessKey.css';
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
const AWSAccessKeyForm = () => {
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
        <div className="AWSAccessKey_Div">
          <Card className={AWSCardclasses.root}>
            <h2 style={{ color: '#0a2142' }}>Connect AWS Bucket</h2>
            <AWSFormField />
          </Card>
        </div>
      </MiniDrawer>
    </>
  );
};

const OnConnect = () => {
  var AccessKeyId = document.getElementById('AwsAccessKeyId').value;
  var SecretAccessKey = document.getElementById('AwsSecretAccessKey').value;
  var BucketName = document.getElementById('AwsBucketName').value;
  var dcmcAccessKey = document.getElementById('DCMCAccessKey').value;
  //var bucketType = document.getElementById('bucket_type').value;
  var bucketType = 'aws';
  localStorage.setItem('AwsAccessKeyId', AccessKeyId);
  localStorage.setItem('AwsSecretAccessKey', SecretAccessKey);
  localStorage.setItem('AwsBucketName', BucketName);
  localStorage.setItem('DCMCAccessKey', dcmcAccessKey);
  localStorage.setItem('BucketType', bucketType);

  CheckConnectivityMain();
};

const AWSFormField = () => {
  useEffect(() => {
    // Update the document title using the browser API
    CheckConnectivityMain();
  });

  return (
    <div className="access-field-container">
      <Grid container>
        <Grid xs={6} style={{ paddingRight: 10 }}>
          <>
            <label className="field-label" htmlFor="fname">
              AccessKey ID
            </label>
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="AccessKey Id"
              type="text"
              id="AwsAccessKeyId"
              autoComplete="current-password"
              size="small"
              // onChange={() => { }}
            />
            {/* <input
              type="text"
              id="AwsAccessKeyId"
              className="form-control access-field"
              onChange={() => { }}
              placeholder="AccessKey Id"
            /> */}
          </>
        </Grid>
        <Grid xs={6}>
          <>
            <label className="field-label" htmlFor="fname">
              Secret Access Key
            </label>
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Secret Access Key"
              type="text"
              id="AwsSecretAccessKey"
              autoComplete="current-password"
              size="small"
              // onChange={() => { }}
            />
            {/* <input
              type="text"
              id="AwsSecretAccessKey"
              className="form-control access-field"
              onChange={() => { }}
              placeholder="Secret Access Key"
            /> */}
          </>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={6} style={{ paddingRight: 10 }}>
          <>
            <label className="field-label" htmlFor="fname">
              Bucket Name
            </label>
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Bucket Name"
              type="text"
              id="AwsBucketName"
              autoComplete="current-password"
              size="small"
              // onChange={() => { }}
            />
            {/* <input
              type="text"
              id="AwsBucketName"
              className="form-control access-field"
              onChange={() => { }}
              placeholder="Bucket Name"
            /> */}
          </>
        </Grid>
        <Grid xs={6}>
          <>
            <label className="field-label" htmlFor="fname">
              DCMC Access Key
            </label>
            <TextField
              className="text-fields"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="DCMC Access Key"
              type="text"
              id="DCMCAccessKey"
              autoComplete="current-password"
              size="small"
              // onChange={() => { }}
            />
            {/* <input
              type="text"
              id="DCMCAccessKey"
              className="form-control access-field"
              onChange={() => { }}
              placeholder="DCMC Access Key"
            /> */}
          </>
        </Grid>
      </Grid>
      <>
        {/* <label className="field-label" htmlFor="fname">
          Bucket Type
        </label> */}
        <input
          type="hidden"
          id="bucket_type"
          // value="aws"
          className="form-control access-field"
          // onChange={() => { }}
        />
      </>
      <div className="connect-btn-container">
        <button className="connect-btn" id="btnConnect" onClick={OnConnect}>
          <b>Connect</b>
        </button>
      </div>
    </div>
  );
};

function CheckConnectivityMain() {
  var AccessKeyId = localStorage.getItem('AwsAccessKeyId');
  var SecretAccessKey = localStorage.getItem('AwsSecretAccessKey');
  var BucketName = localStorage.getItem('AwsBucketName');
  var DcmcAccessKey = localStorage.getItem('DCMCAccessKey');
  var bucketType = localStorage.getItem('BucketType');

  document.getElementById('AwsAccessKeyId').value = AccessKeyId;
  document.getElementById('AwsSecretAccessKey').value = SecretAccessKey;
  document.getElementById('AwsBucketName').value = BucketName;
  document.getElementById('DCMCAccessKey').value = DcmcAccessKey;
  document.getElementById('bucket_type').value = bucketType;

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
        document.getElementById('btnConnect').style.background = 'green';
      } else {
        //setAwsActive(false);
        document.getElementById('btnConnect').style.background = 'red';
      }
    });
}
export default AWSAccessKeyForm;
