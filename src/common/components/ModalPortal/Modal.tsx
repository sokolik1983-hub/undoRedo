import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';

interface IModalProps {
  className?: string;
  children: ReactNode;
  isVisible: boolean;
  container?: HTMLElement;
}

const Modal: FC<IModalProps> = ({
  className,
  children,
  isVisible,
  container,
}) => {
  const modal = clsx(styles.modal, className, {
    [styles.active]: isVisible,
  });

  return isVisible ? (
    <Portal container={container}>
      <div className={modal}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
