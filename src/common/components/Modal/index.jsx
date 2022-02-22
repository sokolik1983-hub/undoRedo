import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

/**
 * @param visible - булево значение, определяющее, будет ли видно модальное окно
 * @param title - строка содержащая текст заголовка
 * @param content - нода, содержащая в себе контент по середину
 * @param footer - строка содержащая ноду для обработки событий окна
 * @param onClose - функция, которая сработает, когда зароется модальное окно
 */

const Modal = ({ visible, title, content, footer, onClose }) => {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => setIsModal(visible), [visible]);

  const onKeydown = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    onClose();
    setIsModal(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!isModal) return null;

  return (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.modalDialog} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <span className={styles.modalClose} onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalContent}>{content}</div>
        </div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  visible: false,
  title: '',
  content: null,
  footer: null,
  onClose: () => {},

};
