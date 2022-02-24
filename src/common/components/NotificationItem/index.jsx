import cn from 'clsx';
import { useState } from 'react';
import PropTypes from 'prop-types';
import WarnIcon from '../../../layout/assets/warnIcon.svg';
import CollapseIcon from '../../../layout/assets/collapseArrow.svg';
import styles from './NotificationItem.module.scss';

const NotificationItem = ({
  notification: { id, autoHide, variant, title, message, buttonText, reason, advice },
  onClose
}) => {
  const [reasonHidden, setReasonHidden] = useState(false);
  const [adviseHidden, setAdviseHidden] = useState(false);
  const handleAlertClose = () => onClose(id);

  return (
    <div className={cn(styles.root, styles[variant])}>
      <div className={styles.title}>
        <img src={WarnIcon} className={styles.topIcon} alt="React Logo" />
        <span>{title || 'Внимание, ошибка'}</span>
      </div>
      {message && (
        <div className={styles.message}>
          {(reason || advice) && (
            <span className={styles.messageHeader}>
              Что произошло
            </span>
          )}
          <span className={styles.messageText}>{message}</span>
        </div>
      )}
      {reason && (
        <div className={styles.reason}>
          <div
            className={styles.reasonHeaderBox}
            onClick={() => {setReasonHidden(!reasonHidden)}}
          >
            <span className={styles.reasonHeader}>
              Почему это произошло
            </span>
            <img src={CollapseIcon} className={reasonHidden && styles.reasonArrowDown} alt="Arrow" />
          </div>

          {!reasonHidden && <span className={styles.reasonText}>{reason}</span>}
        </div>
      )}
      {advice && (
        <div className={styles.advice}>
          <div
            className={styles.adviseHeaderBox}
            onClick={() => {setAdviseHidden(!adviseHidden)}}
          >
            <span className={styles.adviceHeader}>
              Что мне делать
            </span>
            <img src={CollapseIcon} className={adviseHidden && styles.adviseArrowDown} alt="Arrow" />
          </div>

          {!adviseHidden && <span className={styles.adviseText}>{advice}</span>}
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
