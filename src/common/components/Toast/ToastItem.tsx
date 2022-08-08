import clsx from 'clsx';
import React, { FC } from 'react';

import CloseIcon from '../../../layout/assets/close.svg';
import { ToastItem } from './Toast';
import styles from './Toast.module.scss';

interface IToastItemProps extends ToastItem {
  deleteToast: (id: string) => void;
}

const ToastItem: FC<IToastItemProps> = ({ type, title, deleteToast, id }) => {
  const classes = clsx(
    styles.notification,
    type === 'success' ? styles.success : styles.danger,
  );

  return (
    <div className={classes}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{title}</p>
      </div>
      <span className={styles.modalClose} onClick={() => deleteToast(id)}>
        <CloseIcon className={styles.close} />
      </span>
    </div>
  );
};

export default ToastItem;
