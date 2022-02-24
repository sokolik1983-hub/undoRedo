// import { useSnackbar } from 'notistack';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// // import styles from "./ActionsGroup.module.scss";

// function Notifications() {
//   const { enqueueSnackbar } = useSnackbar();
//   const notifications = useSelector(state => state.app.notifications);

//   useEffect(() => {
//     if (notifications?.message) {
//       enqueueSnackbar(notifications.message, {
//         variant: notifications.messageType
//       });
//     }
//   }, [notifications && notifications.message]);

//   return null;
// }

// export default Notifications;

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
        {notifications?.map(item => (
          <NotificationItem
            key={item.id}
            notification={item}
            onClose={handleClose}
          />
        ))}
      </div>
    </Portal>
  );
};

export default NotificationsList;
