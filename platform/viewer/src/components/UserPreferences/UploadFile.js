import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '@ohif/ui';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import GetAppIcon from '@material-ui/icons/GetApp';
import BackupIcon from '@material-ui/icons/Backup';

import './AWSAccessKeyFields.styl';
import MiniDrawer from '../DashboardPage';
import './UploadFile.css';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UploadFile = () => {
  const [open, setOpen] = React.useState(false);
  const [Files, setFiles] = React.useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // var files;
  const OnFileChange = () => {
    document.getElementById('progress').display = 'block';
    var filer = document.getElementById('fileURL');
    var files = filer.files;
    setFiles(files);
    //  files = filer.files;
    //output.innerHTML = '';
    // BrowseUpload(files);
    handleClick();
  };

  // Handle Cancel
  const handleCancel = () => {
    setFiles('');
  };

  const history = useHistory();
  const useStylesCardForCloud = makeStyles({
    root: {
      minWidth: '100%',
      height: 420,
    },
  });
  const CloudCardclasses = useStylesCardForCloud();

  return (
    <MiniDrawer>
      <div className="UploadFile_Div">
        <Card
          className={`UploadFile_Card ${CloudCardclasses.root}`}
          style={{
            paddingLeft: '6%',
            paddingRight: '6%',
            paddingTop: 20,
            border: '1px solid #d1cfcf',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        >
          <h2 style={{ fontFamily: 'Roboto' }}>Select Bucket</h2>

          <div className="upload-file-conatiner" style={{ marginTop: 20 }}>
            <select
              id="bcketname"
              className="form-control"
              style={{ padding: 5, paddingRight: 10, height: 40 }}
            >
              <option value="">Select Bucket</option>
              <option value={localStorage.getItem('BucketType')}>
                AWS - {localStorage.getItem('AwsBucketName')}
              </option>
              <option value={localStorage.getItem('GoogleBucketType')}>
                {/* <Icon name="google-icon" className="google-icon" width="40px" /> */}
                Google - {localStorage.getItem('GoogleBucketName')}
              </option>
            </select>
            {/* <h1>View Local DICOM file</h1> */}
            {/* <p>
        Click "Choose Folder" and select a DICOM Dicectory on your local file
        system
      </p> */}
            <div
              className="upload-btn-wrapper"
              style={{
                border: '1px dashed #E2E2E2',
                marginTop: '40px',
                borderRadius: 5,
                paddingTop: 17,
                paddingBottom: 25,
                cursor: 'pointer',
                height: 140,
              }}
            >
              <BackupIcon style={{ fontSize: '50px', color: '#0a2142' }} />
              <h3 style={{ color: 'gray', marginTop: 10 }}>
                Select a Folder or browse
              </h3>
              {/* <button className="btn"> Choose file</button> */}
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
          <div style={{ textAlign: 'end', marginTop: '20px' }}>
            {Files && (
              <Button
                onClick={handleCancel}
                variant="outlined"
                className="UploadFilePageCancelButton"
              >
                Cancel
              </Button>
            )}
            {/* {Files &&
            <Button onClick={handleCancel} variant="outlined" style={{ padding: '8px 40px 7px 40px', marginRight: '10px' }}>Cancel</Button>
            } */}
            <Button
              className="UploadFilePageUploadButton"
              disabled={Files ? false : true}
              onClick={() => BrowseUpload(Files)}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="ready to Upload!"
            // action={action}
          />
        </Card>
      </div>
    </MiniDrawer>
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
        // history.push('/DashboardPage/UploadFile')
      });

      // send POST request to server

      request.send(formData);
    }
  }
}
