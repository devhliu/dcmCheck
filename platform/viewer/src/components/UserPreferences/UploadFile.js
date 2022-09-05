import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@dcmcloud/ui';

import './AWSAccessKeyFields.styl';

const UploadFile = () => {
  const OnFileChange = () => {
    document.getElementById('progress').display = 'block';
    var filer = document.getElementById('fileURL');
    var files = filer.files;
    //output.innerHTML = '';
    BrowseUpload(files);
  };

  return (
    <div className="upload-file-conatiner">
      <select id="bcketname" className="form-control">
        <option value="">Select Bucket</option>
        <option value={localStorage.getItem('BucketType')}>
          AWS - {localStorage.getItem('AwsBucketName')}
        </option>
        <option value={localStorage.getItem('GoogleBucketType')}>
          {/* <Icon name="google-icon" className="google-icon" width="40px" /> */}
          Google - {localStorage.getItem('GoogleBucketName')}
        </option>
      </select>
      <h1>View Local DICOM file</h1>
      <p>
        Click "Choose Folder" and select a DICOM Dicectory on your local file
        system
      </p>
      <div className="upload-btn-wrapper">
        <button className="btn"> Choose file</button>
        <input
          type="file"
          name="myfile"
          directory=""
          webkitdirectory=""
          multiple=""
          id="fileURL"
          onChange={OnFileChange}
        />
        <div id="fileOutput"></div>
      </div>
      <p>
        <span id="ufiles"></span>
      </p>
      <div className="loadupload" id="loadupload"></div>
      <div id="progress" className="progress">
        <div
          id="progress_bar"
          className="progress-bar"
          style={{
            backgroundColor: '#3c40ef',
            width: '0%',
          }}
        >
          <span
            className="sr-only"
            id="sr_only"
            style={{ color: '#ffffff' }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

// function CheckBuket() {
//   alert("dhdj");
//   debugger
//   var bucketname = document.getElementById('bcketname').value;
//   if (bucketname == "") {
//     alert("Please select Bucket");
//   }
// }
function BrowseUpload(files) {
  if (files.length > 0) {
    if (window.FormData !== undefined) {
      var formData = new FormData();

      for (var x = 0; x < files.length; x++) {
        console.log(files[x]);
        formData.append('files', eval(files[x]));
      }
      debugger;
      var bucketTYPE = document.getElementById('bcketname').value;
      if (bucketTYPE == 'google') {
        formData.append('bucketname', localStorage.getItem('GoogleBucketName'));
        formData.append(
          'AccessKeyId',
          localStorage.getItem('GoogleAccessKeyID')
        );
        formData.append(
          'SecretAccessKey',
          localStorage.getItem('GoogleSecretAccessKey')
        );
        formData.append(
          'dcmcaccesskey',
          localStorage.getItem('GoogleDCMCAccessKey')
        );
        formData.append('buckettype', localStorage.getItem('GoogleBucketType'));
      } else {
        formData.append('bucketname', localStorage.getItem('AwsBucketName'));
        formData.append('AccessKeyId', localStorage.getItem('AwsAccessKeyId'));
        formData.append(
          'SecretAccessKey',
          localStorage.getItem('AwsSecretAccessKey')
        );
        formData.append('dcmcaccesskey', localStorage.getItem('DCMCAccessKey'));
        formData.append('buckettype', localStorage.getItem('BucketType'));
      }
      let request = new XMLHttpRequest();
      request.open('POST', 'https://app.dcmcloud.com/api/files/uploadserver');

      // upload progress event
      request.upload.addEventListener('progress', function(evt) {
        // upload progress as percentage

        document.getElementById('loadupload').display = 'block';
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          console.log(percentComplete);
          document.getElementById('progress_bar').style.width =
            percentComplete + '%';
          document.getElementById('sr_only').innerHTML = percentComplete + '%';
          document.getElementById('ufiles').innerHTML = percentComplete + '%';
          if (percentComplete === 100) {
            document.getElementById('ufiles').innerHTML =
              'Upload complete! Please wait Loading Files..';
          }
        }
      });

      // request finished event
      request.addEventListener('load', function(e) {
        //HTTP status message (200, 404 etc)
        // alert(request.status);
        //request.response holds response from the server
        //alert(request.response);
        location.reload();
      });

      // send POST request to server
      request.send(formData);
    }
  }
}
