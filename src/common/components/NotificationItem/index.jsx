import cn from 'clsx';
import PropTypes from 'prop-types';
import WarnIcon from '../../../layout/assets/warnIcon.svg';
import styles from './NotificationItem.module.scss';

const NotificationItem = ({
  notification: { id, autoHide, variant, title, message, buttonText, reason, advice },
  onClose
}) => {

  const handleAlertClose = () => onClose(id);

  return (
    <div className={cn(styles.root, styles[variant])}>
      <div className={styles.title}>
        <img src={WarnIcon} className={styles.topIcon} alt="React Logo" />
        <span>{title || 'Внимание, ошибка'}</span>
      </div>
      {message && (
        <div className={styles.message}>
          {(reason || advice) &&
            <span className={styles.messageHeader}>Что произошло</span>}
          <span>{message}</span>
        </div>
      )}
      {reason && (
        <div className={styles.reason}>
          <span className={styles.reasonHeader}>Почему это произошло</span>
          <span>{reason}</span>
        </div>
      )}
      {advice && (
        <div className={styles.advice}>
          <span className={styles.adviceHeader}>Что мне делать</span>
          <span>{advice}</span>
        </div>
      )}
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
