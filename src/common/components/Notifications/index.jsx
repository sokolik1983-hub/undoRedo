import Portal from '@material-ui/core/Portal';
import { useDispatch, useSelector } from 'react-redux';
import { notificationClosed } from '../../../data/reducers/notifications';
import NotificationItem from '../NotificationItem';
import styles from "./Notification.module.scss";

const NotificationsList = () => {
  const notifications = useSelector(state => state.app.notifications.items);
  const dispatch = useDispatch();

  const handleClose = id => {
    dispatch(notificationClosed({ id }));
  };

  return (
    <Portal container={document.body}>
      <div className={styles.root}>
        {notifications?.map((item, idx) => (
          <NotificationItem
            key={item.id}
            notification={item}
            onClose={handleClose}
            index={idx}
          />
        ))}
      </div>
    </Portal>
  );
};

export default NotificationsList;
