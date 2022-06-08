/* eslint-disable react/prop-types */
import clsx from 'clsx';
import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';

const Modal = ({ className, children, isVisible }) => {
  const modal = clsx(styles.modal, className, {
    [styles.active]: isVisible
  });

  return (
    <Portal>
      {isVisible && (
        <div className={modal}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
