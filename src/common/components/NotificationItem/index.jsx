import cn from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// import CloseIcon from '@material-ui/icons/Close';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import styles from './NotificationItem.module.scss';
// import IconButton from '../IconButton';

const ICONS = {
  error: <ErrorOutlineRoundedIcon />,
  success: <CheckCircleOutlineRoundedIcon />,
  warning: <WarningRoundedIcon />,
  info: <InfoRoundedIcon />,
  email: <MailOutlineIcon />
};

const AUTO_HIDE_DURATION = 5000;

const NotificationItem = ({
  notification: { id, autoHide, variant, icon, title, message, buttonText },
  onClose
}) => {
  const [closeTimer, setCloseTimer] = useState(null);

  useEffect(() => {
    if (autoHide) {
      setCloseTimer(
        setTimeout(() => {
          onClose(id);
        }, AUTO_HIDE_DURATION)
      );
    }

    return () => {
      clearTimeout(closeTimer);
    };
  }, []);

  const handleAlertClose = () => onClose(id);

  return (
    <div className={cn(styles.root, styles[variant])}>
      {icon && ICONS[icon]}
      <span className={styles.title}>{title || 'Внимание, ошибка'}</span>
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
