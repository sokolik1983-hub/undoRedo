/* eslint-disable */
import { useCallback } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { ReactComponent as CloseIcon } from '../../../layout/assets/close.svg';
import styles from './Toast.module.scss';

const Toast = ({ toastlist, position, setList, dispatch }) => {
  const deleteToast = useCallback(
    id => {
      const toastListItem = toastlist.filter(e => e.id !== id);
      dispatch(setList(toastListItem));
    },
    [toastlist, setList]
  );

  const successToast = toastlist.find(toast => toast.type === 'success');

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(successToast?.id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, deleteToast]);

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {toastlist.map((toast, i) => (
        <div
          key={i}
          className={`${styles.notification} ${styles[position]} ${
            styles[toast.type]
          }`}
        >
          <div className={styles.titleWrapper}>
            <p className={styles.title}>{toast.title}</p>
          </div>
          <span
            className={styles.modalClose}
            onClick={() => deleteToast(toast.id)}
          >
            <CloseIcon className={styles.close} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
