import cn from 'clsx';
import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import WarnIcon from '../../../layout/assets/warnIcon.svg';
import styles from './NotificationItem.module.scss';

// const AUTO_HIDE_DURATION = 5000;

const NotificationItem = ({
  notification: { id, autoHide, variant, title, message, buttonText },
  onClose
}) => {
  // const [closeTimer, setCloseTimer] = useState(null);
  //
  // useEffect(() => {
  //   if (autoHide) {
  //     setCloseTimer(
  //       setTimeout(() => {
  //         onClose(id);
  //       }, AUTO_HIDE_DURATION)
  //     );
  //   }
  //
  //   return () => {
  //     clearTimeout(closeTimer);
  //   };
  // }, []);

  const handleAlertClose = () => onClose(id);

  return (
    <div className={cn(styles.root, styles[variant])}>
      <div className={styles.title}>
        <img src={WarnIcon} className={styles.topIcon} alt="React Logo" />
        <span>{title || 'Внимание, ошибка'}</span>
      </div>
      {message && <span className={styles.message}>{message}</span>}
      {!autoHide && (
        <div
          className={styles.button}
          onClick={handleAlertClose}
        >
          {buttonText || 'OK'}
        </div>
      )}
    </div>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  notification: PropTypes.object,
  onClose: PropTypes.func
};

NotificationItem.defaultProps = {
  notification: {},
  onClose: () => {}
};
