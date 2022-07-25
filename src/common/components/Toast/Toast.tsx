import { useCallback, useEffect } from 'react';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { TOAST_TYPE } from '../../constants/common';
import Portal from '../Portal';
import styles from './Toast.module.scss';
import ToastItem from './ToastItem';

interface IToastProps {
  toastList: Array<ToastItem>;
  setList: (arr: Array<ToastItem>) => Array<ToastItem>;
}

interface ToastItem {
  id: string;
  type: string;
  title: string;
}

const Toast: FC<IToastProps> = ({ toastList, setList }) => {
  const dispatch = useDispatch();
  const deleteToast = useCallback(
    (id?: string) => {
      const toastListItem = toastList.filter((el) => el.id !== id);
      dispatch(setList(toastListItem));
    },
    [toastList, setList],
  );

  const successToast = toastList?.find(
    (toast) => toast.type === TOAST_TYPE.SUCCESS,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList?.length) {
        deleteToast(successToast?.id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, deleteToast]);

  return (
    <Portal>
      <div className={styles.container}>
        {toastList?.map((toast) => (
          <ToastItem
            type={toast.type}
            title={toast.title}
            key={toast.id}
            deleteToast={deleteToast}
            id={toast.id}
          />
        ))}
      </div>
    </Portal>
  );
};

export default Toast;
