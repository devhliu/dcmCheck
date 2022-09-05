import React, { useState, useEffect } from 'react';
import { TabComponents } from '@dcmcloud/ui';
import './AWSAccessKeyFields.styl';

const AWSAccessKeyFields = () => {
  const [awsActive, setAwsActive] = useState(false);
  const [gActive, setGActive] = useState(false);
  const tabs = [
    {
      name: `AWS AccessKeys  ${awsActive ? '✅' : '✔'}`,
      Component: AWSFormField,
      customProps: {},
    },
    {
      name: `Googles AccessKeys  ${gActive ? '✅' : '✔'}`,
      Component: GoogleFormField,
      customProps: {},
    },
  ];

  return <TabComponents tabs={tabs} />;
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

export default AWSAccessKeyFields;

const AWSFormField = () => {
  useEffect(() => {
    // Update the document title using the browser API
    CheckConnectivityMain();
  });

  return (
    <div className="access-field-container">
      <>
        <label className="field-label" htmlFor="fname">
          AccessKey ID
        </label>
        <input
          type="text"
          id="AwsAccessKeyId"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="AccessKey Id"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          Secret Access Key
        </label>
        <input
          type="text"
          id="AwsSecretAccessKey"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="Secret Access Key"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          Bucket Name
        </label>
        <input
          type="text"
          id="AwsBucketName"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="Bucket Name"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          DCMC Access Key
        </label>
        <input
          type="text"
          id="DCMCAccessKey"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="DCMC Access Key"
        />
      </>
      <>
        {/* <label className="field-label" htmlFor="fname">
          Bucket Type
        </label> */}
        <input
          type="hidden"
          id="bucket_type"
          value="aws"
          className="form-control access-field"
          onChange={() => {}}
        />
      </>
      <div className="connect-btn-container">
        <button className="connect-btn" id="btnConnect" onClick={OnConnect}>
          Connect
        </button>
      </div>
    </div>
  );
};

const GoogleFormField = () => {
  useEffect(() => {
    // Update the document title using the browser API
    CheckConnectivityMainGoogle();
  });
  return (
    <div className="access-field-container">
      <>
        <label className="field-label" htmlFor="fname">
          Google AccessKey ID
        </label>
        <input
          id="GoogleAccessKeyID"
          type="text"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="AccessKey Id"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          Google Secret Access Key
        </label>
        <input
          id="GoogleSecretAccessKey"
          type="text"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="Secret Access Key"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          Google Bucket Name
        </label>
        <input
          id="GoogleBucketName"
          type="text"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="Bucket Name"
        />
      </>
      <>
        <label className="field-label" htmlFor="fname">
          DCMC AccessKey
        </label>
        <input
          id="GoogleDCMCAccesskey"
          type="text"
          className="form-control access-field"
          onChange={() => {}}
          placeholder="DCMC AccessKey"
        />
      </>
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
          connect
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
