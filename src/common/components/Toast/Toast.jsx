/* eslint-disable */
import { useCallback, useEffect } from 'react';
import ToastItem from './ToastItem';
import styles from './Toast.module.scss';

const Toast = ({ toastlist, setList, dispatch }) => {
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
    <div className={styles.container}>
      {toastlist.map((toast, index) => (
        <ToastItem type={toast.type} title={toast.title} key={index} deleteToast={deleteToast} id={toast.id}/>
      ))}
    </div>
  );
};

export default Toast;
