import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import styles from './UserActions.module.scss';
import ActionsGroup from '../../../../common/components/ActionsGroup';
import { logoutUser } from '../../../../data/actions/auth';

function UserActions() {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <ActionsGroup
        titleClassName={styles.text}
        actions={[
          {
            id: 'QUIT',
            name: 'Quit',
            icon: <ExitToAppIcon className={styles.icon} />,
            action: () => dispatch(logoutUser())
          }
        ]}
      />
    </div>
  );
}

export default UserActions;
