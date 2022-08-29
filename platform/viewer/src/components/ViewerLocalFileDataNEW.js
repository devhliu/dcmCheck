import React, { Component } from 'react';
import { metadata, utils } from '@OHIF/core';

import ConnectedViewer from '../connectedComponents/ConnectedViewer';
import PropTypes from 'prop-types';
import { extensionManager } from './../App.js';
import Dropzone from 'react-dropzone';
import filesToStudies from '../lib/filesToStudies';
import './ViewerLocalFileData.css';


import { withTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import GetAppIcon from '@material-ui/icons/GetApp';
import MiniDrawer from './DashboardPage';



const { DCMCloudStudyMetadata } = metadata;
const { studyMetadataManager } = utils;


const dropZoneLinkDialogFiles = (onDrop, i18n, dir) => {
  return (
    <Dropzone onDrop={onDrop} noDrag>
      {({ getRootProps, getInputProps }) => (
        <span {...getRootProps()} className="link-dialog">
          {dir ? (
            <Button className='DCMLocalPage_Button_SelectFolders DCMLocalPage_Button_FontSize' size='large' style={{ marginLeft: '10px' }} color="primary" endIcon={<FolderIcon />}>
              {i18n('Select Folders')}
              <input
                {...getInputProps()}
                webkitdirectory="true"
                mozdirectory="true"
              />

            </Button>

            // <span>
            // </span>
          ) : (
            <Button className='DCMLocalPage_Button_SelectFiles DCMLocalPage_Button_FontSize' size='large' color="primary" style={{ padding: '8px 35px' }} endIcon={<InsertDriveFileIcon />}>
              {i18n('Select Files')}
              <input {...getInputProps()} />

            </Button>

            // <span>
            // </span>
          )}

        </span>
      )}
    </Dropzone>
  );
};
// const dropZoneLinkDialogFolders = (onDrop, i18n, dir) => {
//   return (
//     <Dropzone onDrop={onDrop} noDrag>
//       {({ getRootProps, getInputProps }) => (
//         <span {...getRootProps()} className="link-dialog">
//           {dir ? (
//             <span>
//               {i18n(' folders')}
//               <input
//                 {...getInputProps()}
//                 webkitdirectory="true"
//                 mozdirectory="true"
//               />
//             </span>
//           ) : (
//             <span>
//               {i18n(' files')}
//               <input {...getInputProps()} />
//             </span>
//           )}

//         </span>
//       )}
//     </Dropzone>
//   );
// };

// const linksDialogMessage = (onDrop, i18n) => {
//   return (
//     <>
//       {i18n('Select ')}
//       {dropZoneLinkDialog(onDrop, i18n)}
//       {i18n(' or ')}
//       {dropZoneLinkDialog(onDrop, i18n, true)}
//       {/* {i18n(' from dialog')} */}
//     </>
//   );
// };
const linksDialogMessageFiles = (onDrop, i18n) => {
  return (
    <>
      {/* {i18n('Select ')} */}
      {dropZoneLinkDialogFiles(onDrop, i18n)}
      {/* {i18n(' from dialog')} */}
    </>
  );
};
const linksDialogMessageFolders = (onDrop, i18n) => {
  return (
    <>
      {/* {i18n(' or ')} */}
      {dropZoneLinkDialogFiles(onDrop, i18n, true)}
      {/* {i18n(' from dialog')} */}
    </>
  );
};

class ViewerLocalFileData extends Component {


  static propTypes = {
    studies: PropTypes.array,
  };

  state = {
    studies: null,
    loading: false,
    error: null,
  };


  updateStudies = studies => {
    // Render the viewer when the data is ready
    studyMetadataManager.purge();

    // Map studies to new format, update metadata manager?
    const updatedStudies = studies.map(study => {
      const studyMetadata = new DCMCloudStudyMetadata(
        study,
        study.StudyInstanceUID
      );
      const sopClassHandlerModules =
        extensionManager.modules['sopClassHandlerModule'];

      study.displaySets =
        study.displaySets ||
        studyMetadata.createDisplaySets(sopClassHandlerModules);

      studyMetadata.forEachDisplaySet(displayset => {
        displayset.localFile = true;
      });

      studyMetadataManager.add(studyMetadata);

      return study;
    });

    this.setState({
      studies: updatedStudies,
    });
  };


  render() {
    const onDrop = async acceptedFiles => {
      this.setState({ loading: true });

      const studies = await filesToStudies(acceptedFiles);
      const updatedStudies = this.updateStudies(studies);

      if (!updatedStudies) {
        return;
      }

      this.setState({ studies: updatedStudies, loading: false });
    };

    if (this.state.error) {
      return <div>Error: {JSON.stringify(this.state.error)}</div>;
    }



    return (
      <MiniDrawer>
        <Dropzone onDrop={onDrop} noClick>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={{ width: '100%' }}>
              {this.state.studies ? (
                <ConnectedViewer
                  studies={this.state.studies}
                  studyInstanceUIDs={
                    this.state.studies &&
                    this.state.studies.map(a => a.StudyInstanceUID)
                  }
                />
              ) : (
                <div className={'drag-drop-instructions'} style={{ width: '100%', height: '100%', marginTop: 30 }}>
                  <div className={'drag-drop-contents'}>
                    {this.state.loading ? (
                      <h3>{this.props.t('Loading...')}</h3>
                    ) : (
                      <>
                        <h2 style={{ color: '#0a2142', fontFamily: 'inherit', padding: 15, paddingLeft: 0, marginRight: '10' }}>
                          {this.props.t(
                            'Drag and Drop or Select DICOM files here to load them in the Viewer'
                          )}
                        </h2>
                        <Card style={{ width: '100%', border: '1px solid #d1cfcf', padding: 20, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <CardContent style={{ textAlign: 'center' }}>

                            <GetAppIcon style={{ fontSize: '50px', color: '#0a2142' }} />
                            <p>Select files or folders</p>

                          </CardContent>
                          <div style={{ textAlign: 'center', justifyContent: 'between' }}>
                            <span>{linksDialogMessageFiles(onDrop, this.props.t)}</span>
                            {/* <Button variant="outlined" color="primary">
                            </Button> */}
                            <span>{linksDialogMessageFolders(onDrop, this.props.t)}</span>
                            {/* <Button variant="outlined" color="primary">
                            </Button> */}
                          </div>
                          <CardActions>
                          </CardActions>
                        </Card>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Dropzone>

      </MiniDrawer>
    );
  }
}

export default withTranslation('Common')(ViewerLocalFileData);
