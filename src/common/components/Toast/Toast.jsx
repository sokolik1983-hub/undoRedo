/* eslint-disable */
import { useCallback } from 'react'
import { useEffect } from 'react/cjs/react.development';
import styles from './Toast.module.scss'

const Toast = ({ toastlist, position, setList, dispatch }) => {

  const deleteToast = useCallback(id => {
    const toastListItem = toastlist.filter(e => e.id !== id);
    dispatch(setList(toastListItem));
  }, [toastlist, setList]);

  const successToast = toastlist.find(toast => toast.type === 'success');

  useEffect(() => {
    const interval = setInterval(() => {
      if(toastlist.length) {
        deleteToast(successToast?.id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [toastlist, deleteToast]);

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {
        toastlist.map((toast, i) => (
          <div
            key={i}
            className={`${styles.notification} ${styles.toast} ${styles[position]}`}
            style={{ backgroundColor: toast.backgroundColor, width: '1100px', height: '64px'}}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div>
              <p className={styles.title}>{toast.title}</p>
              <p className={styles.description}>{toast.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Toast