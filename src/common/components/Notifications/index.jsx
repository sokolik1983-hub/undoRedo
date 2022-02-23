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
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { notificationClosed } from '../../../data/reducers/notifications';
import NotificationItem from '../NotificationItem';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 9999
  }
}));

const NotificationsList = () => {
  const notifications = useSelector(state => state.app.notifications.items);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = id => {
    dispatch(notificationClosed({ id }));
  };

  console.log(notifications, 'notifications');

  return (
    <Portal container={document.body}>
      <div className={classes.root}>
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
