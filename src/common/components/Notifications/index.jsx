import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import styles from "./ActionsGroup.module.scss";

function Notifications() {
  const { enqueueSnackbar } = useSnackbar();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    if (notifications.message) {
      enqueueSnackbar(notifications.message, {
        variant: notifications.messageType
      });
    }
  }, [notifications && notifications.message]);

  return null;
}

export default Notifications;
