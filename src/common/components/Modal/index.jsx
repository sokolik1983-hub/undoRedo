import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = ({ visible, title, content, footer, onClose }) => {
  const onKeydown = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalDialog} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  footer: PropTypes.string,
  onClose: PropTypes.func
};

Modal.defaultProps = {};
