import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, onClose }) => {
  const handleOverlayClick = useCallback(
    event => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        {image && <img src={image} alt="" />}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
