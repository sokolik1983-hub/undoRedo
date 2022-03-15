import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import  { ReactComponent as CloseIcon }  from '../../../layout/assets/close.svg'

/**
 * @param visible - булево значение, определяющее, будет ли видно модальное окно
 * @param title - строка содержащая текст заголовка
 * @param content - нода, содержащая в себе контент по середину
 * @param footer - строка содержащая ноду для обработки событий окна
 * @param onClose - функция, которая сработает, когда зароется модальное окно
 * @param withModalScroll - булево значение, позволяющее скролить контент модального окна с внутреннем скроллом
 * @param titleClassName - классы для кастомизации title
 * @param dialogClassName - классы для кастомизации dialog
 * @param dialogClassName - классы для кастомизации header
 * @param bodyClassName - класс для тела окна
 */

const Modal = ({ visible, title, content, footer, onClose, withScroll, titleClassName, dialogClassName, headerClassName, bodyClassName }) => {
  const [isModal, setIsModal] = useState(false);

  const modalClasses = clsx(
    styles.modal,
    { [styles.modalWithScroll]: withScroll }
  );

  const modalDialogClasses = clsx(
    styles.modalDialog, dialogClassName,
    { [styles.modalDialogWithScroll]: withScroll }
  );

  const modalBodyClasses = clsx(
    styles.modalBody,
    { [styles.modalBodyWithScroll]: withScroll },
    bodyClassName
  );

  const titleClasses = clsx(
    styles.modalTitle,
    titleClassName
  );

  const headerClasses = clsx(
    styles.modalHeader,
    headerClassName
  );

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
    <div className={modalClasses} onClick={handleClose}>
      <div className={modalDialogClasses} onClick={e => e.stopPropagation()}>
        <div className={headerClasses}>
          <h3 className={titleClasses}>{title}</h3>
          <span className={styles.modalClose} onClick={handleClose}>
            <CloseIcon className={styles.close} />
          </span>
        </div>
        <div className={modalBodyClasses}>
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
  withScroll: PropTypes.bool,
  onClose: PropTypes.func,
  titleClassName: PropTypes.string,
  dialogClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
};

Modal.defaultProps = {
  visible: false,
  title: '',
  content: null,
  footer: null,
  withScroll: true,
  onClose: () => {},
  titleClassName: '',
  dialogClassName: '',
  headerClassName: '',
};
