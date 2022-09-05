import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, AboutContent, withModal } from '@dcmcloud/ui';
//
import { UserPreferences } from './../UserPreferences';
import AWSAccessKeyFields from '../UserPreferences/AWSAccessKeyFields';
import DCMCloudLogo from '../DCMCloudLogo/DCMCloudLogo.js';
import './Header.css';
import { Icon } from '@dcmcloud/ui';
import UploadFile from '../UserPreferences/UploadFile';

function Header(props) {
  const {
    t,
    user,
    userManager,
    modal: { show },
    useLargeLogo,
    linkPath,
    linkText,
    location,
    children,
  } = props;

  const [options, setOptions] = useState([]);
  const hasLink = linkText && linkPath;

  const handleClick = () => {
    window.open('https://www.dcmcloud.com/');
  };

  useEffect(() => {
    const optionsValue = [
      {
        title: t('About'),
        icon: { name: 'info' },
        // onClick: handleClick(),
        onClick: () =>
          show({
            content: handleClick(),
          }),
      },
      {
        title: t('Setting'),
        icon: {
          name: 'setting',
        },
        onClick: () =>
          show({
            content: AWSAccessKeyFields,
            title: t('AWS AccessKeys'),
          }),
      },
      {
        title: t('Preferences'),
        icon: {
          name: 'user',
        },
        onClick: () =>
          show({
            content: UserPreferences,
            title: t('User Preferences'),
          }),
      },
    ];

    if (user && userManager) {
      optionsValue.push({
        title: t('Logout'),
        icon: { name: 'power-off' },
        onClick: () => userManager.signoutRedirect(),
      });
    }

    setOptions(optionsValue);
  }, [setOptions, show, t, user, userManager]);

  return (
    <>
      {/* <div className="notification-bar">{t('INVESTIGATIONAL USE ONLY')}</div> */}
      <div
        className={classNames('entry-header', { 'header-big': useLargeLogo })}
      >
        <div className="header-left-box">
          {location && location.studyLink && (
            <Link
              to={location.studyLink}
              className="header-btn header-viewerLink"
            >
              {t('Back to Viewer')}
            </Link>
          )}

          {children}

          {hasLink && (
            <Link
              className="header-btn header-studyListLinkSection"
              to={{
                pathname: linkPath,
                state: { studyLink: location.pathname },
              }}
            >
              {t(linkText)}
            </Link>
          )}
        </div>

        <div className="align-right">
          <Link to="/local" className="import-btn">
            <Icon name="import-icon" className="import-icon" />
            Local
            {/* <input type="file" name="myfile" /> */}
          </Link>
          <button
            className="import-btn"
            onClick={() =>
              show({
                content: UploadFile,
                title: t('Upload File'),
              })
            }
          >
            <Icon name="cloud-upload-icon" className="cloud-upload-icon" />
            Cloud
            {/* <input type="file" name="myfile" /> */}
          </button>
          <div className="header-menu">
            {/* <Dropdown
            title={
              <img
                src="../../../public/assets/settings.png"
                alt="setting logo"
              />
            }
            list={options}
            align="right"
          /> */}

            <Dropdown
              title={<Icon name="setting" className="setting-icon" />}
              list={options}
              align="right"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  // Study list, /
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
  useLargeLogo: PropTypes.bool,
  //
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  userManager: PropTypes.object,
  user: PropTypes.object,
  modal: PropTypes.object,
};

Header.defaultProps = {
  useLargeLogo: false,
  children: DCMCloudLogo(),
};

export default withTranslation(['Header', 'AboutModal'])(
  withRouter(withModal(Header))
);
