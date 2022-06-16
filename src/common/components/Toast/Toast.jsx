import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ToastItem from './ToastItem';
import Portal from '../Portal/Portal';
import styles from './Toast.module.scss';
import { TOAST_TYPE } from '../../constants/common';

const Toast = ({ toastList, setList }) => {
  const dispatch = useDispatch();
  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastList.filter((e) => e.id !== id);
      dispatch(setList(toastListItem));
    },
    [toastList, setList]
  );

  const successToast = toastList?.find(
    (toast) => toast.type === TOAST_TYPE.SUCCESS
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

Toast.propTypes = {
  toastList: PropTypes.arrayOf(PropTypes.object),
  setList: PropTypes.func
};
