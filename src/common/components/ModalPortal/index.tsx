import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import Portal from '../Portal';
import styles from './Modal.module.scss';

interface IModalPortalProps {
  className: string;
  children: ReactNode;
  isVisible: boolean;
}

const ModalPortal: FC<IModalPortalProps> = ({
  className,
  children,
  isVisible,
}) => {
  const modalClass = clsx(styles.modal, className, {
    [styles.active]: isVisible,
  });

  return (
    <Portal>
      {isVisible ? (
        <div className={modalClass}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      ) : (
        <></>
      )}
    </Portal>
  );
};

export default ModalPortal;
