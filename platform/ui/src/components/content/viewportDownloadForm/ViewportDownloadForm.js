import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './ViewportDownloadForm.styl';
import { TextInput, Select, Icon } from '@dcmcloud/ui';
import classnames from 'classnames';

const FILE_TYPE_OPTIONS = [
  {
    key: 'jpg',
    value: 'jpg',
  },
  {
    key: 'png',
    value: 'png',
  },
];

const DEFAULT_FILENAME = 'image';
const REFRESH_VIEWPORT_TIMEOUT = 1000;

function getKey() {
  var urlArray = window.location.href.split('/');
  var keyTypeArray = urlArray[urlArray.length - 1];

  return keyTypeArray;
}

function loadUploadedImage() {
  document.getElementById('uploadBtnDiv').style.display = 'none';
  document.getElementById('deleteBtnDiv').style.display = 'block';
  event.currentTarget.getElementsByTagName('img')[0].src;
  document.getElementById(
    'image_Preview'
  ).src = event.currentTarget.getElementsByTagName('img')[0].src;

  document.getElementsByClassName(
    'preview-header'
  )[0].innerHTML = event.currentTarget.getElementsByTagName('div')[0].innerHTML;
  document.getElementsByClassName('preview-header')[0].style.right = '142px';
  MainFileName = event.currentTarget.getElementsByTagName('input')[0].value;
  //alert(MainFileName);
  // document.getElementById('FileID').value = MainFileName;
  // alert(document.getElementById('FileID').value);
}

function ShowLoading() {
  try {
    document.getElementById('uploadingDiv').style.display = 'flex';
  } catch {}
}

function HideLoading() {
  try {
    document.getElementById('uploadingDiv').style.display = 'none';
  } catch {}
}

var MainFileName = '';

function LoadKeyImages() {
  ShowLoading();
  var formData = new FormData();
  formData.append('TokenId', getKey());

  let request = new XMLHttpRequest();
  request.open('POST', 'https://localhost:44355/api/files/getkeyimages');

  // upload progress event
  request.upload.addEventListener('progress', function(evt) {
    // upload progress as percentage
  });

  // request finished event
  request.addEventListener('load', function(e) {
    //alert(JSON.stringify(request.response));
    setTimeout(function() {
      document.getElementsByClassName('current')[0].click();
      var elements = document.getElementsByClassName('loaded');
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }

      var JsonData = JSON.parse(request.response);
      for (let index = 0; index < JsonData.length; index++) {
        var divElement = document.createElement('div');
        divElement.className = 'view-key-preview loaded';
        divElement.addEventListener('click', function() {
          loadUploadedImage();
        });

        var imgElement = document.createElement('img');
        imgElement.className = 'view-key-image';
        imgElement.alt = 'Image Preview';
        imgElement.src = JsonData[index].imageUrl;

        var divChildElement = document.createElement('div');
        divChildElement.className = 'image-header';
        divChildElement.innerHTML = JsonData[index].displayName;

        var inputElement = document.createElement('input');
        inputElement.type = 'hidden';
        inputElement.value = JsonData[index].fileName;

        divElement.appendChild(imgElement);
        divElement.appendChild(divChildElement);
        divElement.appendChild(inputElement);
        document.getElementById('KeyImagesDiv').appendChild(divElement);
      }

      HideLoading();
    }, 1500);

    // HTTP status message (200, 404 etc)
    //alert(request.status);
    // request.response holds response from the server
    //alert(request.response);
    //location.reload();
  });

  // send POST request to server
  request.send(formData);
}

const ViewportDownloadForm = ({
  activeViewport,
  onClose,
  updateViewportPreview,
  enableViewport,
  disableViewport,
  toggleAnnotations,
  loadImage,
  downloadBlob,
  defaultSize,
  minimumSize,
  maximumSize,
  canvasClass,
}) => {
  const [t] = useTranslation('ViewportDownloadForm');

  const [filename, setFilename] = useState(DEFAULT_FILENAME);
  const [fileType, setFileType] = useState('jpg');

  const [dimensions, setDimensions] = useState({
    width: defaultSize,
    height: defaultSize,
  });

  const [showAnnotations, setShowAnnotations] = useState(true);

  const [keepAspect, setKeepAspect] = useState(true);
  const [aspectMultiplier, setAspectMultiplier] = useState({
    width: 1,
    height: 1,
  });

  const [viewportElement, setViewportElement] = useState();
  const [viewportElementDimensions, setViewportElementDimensions] = useState({
    width: defaultSize,
    height: defaultSize,
  });

  const [downloadCanvas, setDownloadCanvas] = useState({
    ref: createRef(),
    width: defaultSize,
    height: defaultSize,
  });

  const [viewportPreview, setViewportPreview] = useState({
    src: null,
    width: defaultSize,
    height: defaultSize,
  });

  const [error, setError] = useState({
    width: false,
    height: false,
    filename: false,
  });

  const hasError = Object.values(error).includes(true);

  const refreshViewport = useRef(null);

  const downloadImage = () => {
    downloadBlob(
      filename || DEFAULT_FILENAME,
      fileType,
      viewportElement,
      downloadCanvas.ref.current
    );
  };

  const callCurrentImage = event => {
    document.getElementsByClassName('current')[0].click();
  };

  const loadCurrentImage = event => {
    document.getElementById('uploadBtnDiv').style.display = 'block';
    document.getElementById('deleteBtnDiv').style.display = 'none';
    event.currentTarget.getElementsByTagName('img')[0].src;
    document.getElementById(
      'image_Preview'
    ).src = event.currentTarget.getElementsByTagName('img')[0].src;

    document.getElementsByClassName(
      'preview-header'
    )[0].innerHTML = event.currentTarget.getElementsByTagName(
      'div'
    )[0].innerHTML;
    document.getElementsByClassName('preview-header')[0].style.right = '250px';
  };

  const deleteImage = () => {
    var r = confirm('Are you sure want to delete this key image!');
    if (r == true) {
      ShowLoading();
      var formData = new FormData();
      //alert(MainFileName);
      formData.append('TokenId', getKey());
      formData.append('FilePath', MainFileName);

      let request = new XMLHttpRequest();
      request.open('POST', 'https://localhost:44355/api/mage');

      // upload progress event
      request.upload.addEventListener('progress', function(evt) {
        // upload progress as percentage
      });

      // request finished event
      request.addEventListener('load', function(e) {
        LoadKeyImages();
      });

      // send POST request to server
      request.send(formData);
    }
  };

  const uploadImage = () => {
    ShowLoading();
    var Img1 = document.getElementById('image_Preview');
    var formData = new FormData();
    formData.append('TokenId', getKey());
    formData.append('base64str', Img1.src);

    let request = new XMLHttpRequest();
    request.open('POST', 'https://localhost:44355/api/mage');

    // upload progress event
    request.upload.addEventListener('progress', function(evt) {
      // upload progress as percentage
      // document.getElementById('loadupload').display = 'block';
      // if (evt.lengthComputable) {
      //   var percentComplete = evt.loaded / evt.total;
      //   percentComplete = parseInt(percentComplete * 100);
      //   //console.log(percentComplete);
      //   document.getElementById('progress_bar').style.width =
      //     percentComplete + '%';
      //   document.getElementById('sr_only').innerHTML = percentComplete + '%';
      //   // document.getElementById('ufiles').innerHTML = percentComplete + '%';
      //   if (percentComplete === 100) {
      //     document.getElementById('ufiles').innerHTML =
      //       'Upload complete! Please wait Loading Files..';
      //   }
      // }
    });

    // request finished event
    request.addEventListener('load', function(e) {
      // HTTP status message (200, 404 etc)
      //alert(request.status);
      // request.response holds response from the server
      //alert(request.response);
      //location.reload();
      LoadKeyImages();
    });

    // send POST request to server
    request.send(formData);
  };

  /**
   * @param {object} event - Input change event
   * @param {string} dimension - "height" | "width"
   */
  const onDimensionsChange = (event, dimension) => {
    const oppositeDimension = dimension === 'height' ? 'width' : 'height';
    const sanitizedTargetValue = event.target.value.replace(/\D/, '');
    const isEmpty = sanitizedTargetValue === '';
    const newDimensions = { ...dimensions };
    const updatedDimension = isEmpty
      ? ''
      : Math.min(sanitizedTargetValue, maximumSize);

    if (updatedDimension === dimensions[dimension]) {
      return;
    }

    newDimensions[dimension] = updatedDimension;

    if (keepAspect && newDimensions[oppositeDimension] !== '') {
      newDimensions[oppositeDimension] = Math.round(
        newDimensions[dimension] * aspectMultiplier[oppositeDimension]
      );
    }

    // In current code, keepAspect is always `true`
    // And we always start w/ a square width/height
    setDimensions(newDimensions);

    // Only update if value is non-empty
    if (!isEmpty) {
      setViewportElementDimensions(newDimensions);
      setDownloadCanvas(state => ({
        ...state,
        ...newDimensions,
      }));
    }
  };

  const error_messages = {
    width: t('minWidthError'),
    height: t('minHeightError'),
    filename: t('emptyFilenameError'),
  };

  const renderErrorHandler = errorType => {
    if (!error[errorType]) {
      return null;
    }

    return <div className="input-error">{error_messages[errorType]}</div>;
  };

  const onKeepAspectToggle = () => {
    const { width, height } = dimensions;
    const aspectMultiplier = { ...aspectMultiplier };
    if (!keepAspect) {
      const base = Math.min(width, height);
      aspectMultiplier.width = width / base;
      aspectMultiplier.height = height / base;
      setAspectMultiplier(aspectMultiplier);
    }

    setKeepAspect(!keepAspect);
  };

  const validSize = value => (value >= minimumSize ? value : minimumSize);
  const loadAndUpdateViewports = useCallback(async () => {
    const { width: scaledWidth, height: scaledHeight } = await loadImage(
      activeViewport,
      viewportElement,
      dimensions.width,
      dimensions.height
    );

    toggleAnnotations(showAnnotations, viewportElement);

    const scaledDimensions = {
      height: validSize(scaledHeight),
      width: validSize(scaledWidth),
    };

    setViewportElementDimensions(scaledDimensions);
    setDownloadCanvas(state => ({
      ...state,
      ...scaledDimensions,
    }));

    const {
      dataUrl,
      width: viewportElementWidth,
      height: viewportElementHeight,
    } = await updateViewportPreview(
      viewportElement,
      downloadCanvas.ref.current,
      fileType
    );

    setViewportPreview(state => ({
      ...state,
      src: dataUrl,
      width: validSize(viewportElementWidth),
      height: validSize(viewportElementHeight),
    }));
  }, [
    loadImage,
    activeViewport,
    viewportElement,
    dimensions.width,
    dimensions.height,
    toggleAnnotations,
    showAnnotations,
    validSize,
    updateViewportPreview,
    downloadCanvas.ref,
    fileType,
  ]);

  useEffect(() => {
    enableViewport(viewportElement);

    return () => {
      disableViewport(viewportElement);
    };
  }, [disableViewport, enableViewport, viewportElement]);

  useEffect(() => {
    if (refreshViewport.current !== null) {
      clearTimeout(refreshViewport.current);
    }

    refreshViewport.current = setTimeout(() => {
      refreshViewport.current = null;
      loadAndUpdateViewports();
    }, REFRESH_VIEWPORT_TIMEOUT);
  }, [
    activeViewport,
    viewportElement,
    showAnnotations,
    dimensions,
    loadImage,
    toggleAnnotations,
    updateViewportPreview,
    fileType,
    downloadCanvas.ref,
    minimumSize,
    maximumSize,
    loadAndUpdateViewports,
  ]);

  useEffect(() => {
    LoadKeyImages();
    const { width, height } = dimensions;
    const hasError = {
      width: width < minimumSize,
      height: height < minimumSize,
      filename: !filename,
    };

    setError({ ...hasError });
  }, [dimensions, filename, minimumSize]);

  //LoadKeyImages();
  return (
    <div className="ViewportDownloadForm" style={{ position: 'relative' }}>
      {/* <div
        id="uploadingDiv"
        style={{ zIndex: 1, backgroundColor: '#ffffff' }}
        className="loading-image"
      >
        <Icon name="circle-notch" className="icon-spin" />
        {t('uploadingKeyImage')}
      </div> */}
      {viewportPreview.src ? (
        <div className="preview" data-cy="image-preview">
          <div className="preview-header">Current</div>
          <input id="FileID" type="hidden" value=""></input>
          <div
            id="KeyImagesDiv"
            className="key-images"
            style={{ overflow: 'hidden', height: 'auto' }}
          >
            <div
              onClick={loadCurrentImage}
              className="view-key-preview current"
            >
              <img
                className="view-key-image"
                src={viewportPreview.src}
                alt={t('imagePreview')}
                data-cy="image-preview"
                data-cy="viewport-preview-img"
              />
              <div className="image-header">Current</div>
              <input type="hidden" value="current"></input>
            </div>
          </div>
          <img
            id="image_Preview"
            className="viewport-preview"
            src={viewportPreview.src}
            alt={t('imagePreview')}
            data-cy="image-preview"
            data-cy="viewport-preview-img"
          />
        </div>
      ) : (
        <div className="loading-image">
          <Icon name="circle-notch" className="icon-spin" />
          {t('loadingPreview')}
        </div>
      )}
      <div className="title">{t('formTitle')}</div>

      <div className="file-info-container" data-cy="file-info-container">
        <div className="dimension-wrapper">
          <div className="dimensions">
            <div className="width">
              <TextInput
                type="number"
                min={minimumSize}
                max={maximumSize}
                value={dimensions.width}
                label={t('imageWidth')}
                onChange={evt => onDimensionsChange(evt, 'width')}
                data-cy="image-width"
              />
              {renderErrorHandler('width')}
            </div>
            <div className="height">
              <TextInput
                type="number"
                min={minimumSize}
                max={maximumSize}
                value={dimensions.height}
                label={t('imageHeight')}
                onChange={evt => onDimensionsChange(evt, 'height')}
                data-cy="image-height"
              />
              {renderErrorHandler('height')}
            </div>
          </div>
          <div className="keep-aspect-wrapper">
            <button
              id="keep-aspect"
              className={classnames(
                'form-button btn',
                keepAspect ? 'active' : ''
              )}
              data-cy="keep-aspect"
              alt={t('keepAspectRatio')}
              onClick={onKeepAspectToggle}
            >
              <Icon
                name={keepAspect ? 'link' : 'unlink'}
                alt={keepAspect ? 'Dismiss Aspect' : 'Keep Aspect'}
              />
            </button>
          </div>
        </div>

        <div className="col">
          <div className="file-name">
            <TextInput
              type="text"
              data-cy="file-name"
              value={filename}
              onChange={event => setFilename(event.target.value)}
              label={t('filename')}
              id="file-name"
            />
            {renderErrorHandler('filename')}
          </div>
          <div className="file-type">
            <Select
              value={fileType}
              data-cy="file-type"
              onChange={event => setFileType(event.target.value)}
              options={FILE_TYPE_OPTIONS}
              label={t('fileType')}
            />
          </div>
        </div>

        <div className="col">
          <div className="show-annotations">
            <label htmlFor="show-annotations" className="form-check-label">
              <input
                id="show-annotations"
                data-cy="show-annotations"
                type="checkbox"
                className="form-check-input"
                checked={showAnnotations}
                onChange={event => setShowAnnotations(event.target.checked)}
                onClick={callCurrentImage}
              />
              {t('showAnnotations')}
            </label>
          </div>
        </div>
      </div>

      <div
        style={{
          height: viewportElementDimensions.height,
          width: viewportElementDimensions.width,
          position: 'absolute',
          left: '9999px',
        }}
        ref={ref => setViewportElement(ref)}
      >
        <canvas
          className={canvasClass}
          style={{
            height: downloadCanvas.height,
            width: downloadCanvas.width,
            display: 'block',
          }}
          width={downloadCanvas.width}
          height={downloadCanvas.height}
          ref={downloadCanvas.ref}
        ></canvas>
      </div>

      <div className="actions">
        <div className="action-cancel">
          <button
            type="button"
            data-cy="cancel-btn"
            className="btn btn-danger"
            onClick={onClose}
          >
            {t('Buttons:Cancel')}
          </button>
        </div>
        <div className="action-save">
          <button
            disabled={hasError}
            onClick={downloadImage}
            className="btn btn-primary"
            data-cy="download-btn"
          >
            {t('Buttons:Download')}
          </button>
        </div>
        <div id="uploadBtnDiv" className="action-save">
          <button
            disabled={hasError}
            onClick={uploadImage}
            className="btn btn-primary"
            data-cy="upload-btn"
          >
            {t('Buttons:Save')}
          </button>
        </div>
        <div
          id="deleteBtnDiv"
          style={{ display: 'none' }}
          className="action-save"
        >
          <button
            disabled={hasError}
            onClick={deleteImage}
            className="btn btn-danger"
            data-cy="delete-btn"
          >
            {t('Buttons:Delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

ViewportDownloadForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  activeViewport: PropTypes.object,
  updateViewportPreview: PropTypes.func.isRequired,
  enableViewport: PropTypes.func.isRequired,
  disableViewport: PropTypes.func.isRequired,
  toggleAnnotations: PropTypes.func.isRequired,
  loadImage: PropTypes.func.isRequired,
  downloadBlob: PropTypes.func.isRequired,
  /** A default width & height, between the minimum and maximum size */
  defaultSize: PropTypes.number.isRequired,
  minimumSize: PropTypes.number.isRequired,
  maximumSize: PropTypes.number.isRequired,
  canvasClass: PropTypes.string.isRequired,
};

export default ViewportDownloadForm;
