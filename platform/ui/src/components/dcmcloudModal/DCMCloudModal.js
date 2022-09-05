import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classNames from 'classnames';

import './DCMCloudModal.styl';

const customStyle = {
  overlay: {
    zIndex: 1071,
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Modal.setAppElement(document.getElementById('root'));

const DCMCloudModal = ({
  className,
  closeButton,
  shouldCloseOnEsc,
  isOpen,
  fullscreen,
  title,
  onClose,
  children,
}) => {
  const renderHeader = () => {
    return (
      title && (
        <div className="DCMCloudModal__header" data-cy="modal-header">
          <h4 style={{ color: '#202020' }}>{title}</h4>
          {closeButton && (
            <button data-cy="close-button" onClick={onClose}>
              ×
            </button>
          )}
        </div>
      )
    );
  };

  const classes = fullscreen
    ? classNames('DCMCloudModal', className, 'DCMCloudModal-fullscreen')
    : classNames('DCMCloudModal', className);

  return (
    <Modal
      className={classes}
      data-cy="modal"
      shouldCloseOnEsc={shouldCloseOnEsc}
      isOpen={isOpen}
      title={title}
      style={customStyle}
    >
      <>
        {renderHeader()}
        <div className="DCMCloudModal__content" data-cy="modal-content">
          {children}
        </div>
      </>
    </Modal>
  );
};

DCMCloudModal.propTypes = {
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  shouldCloseOnEsc: PropTypes.bool,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DCMCloudModal;
