import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './UserActions.module.scss';
import ActionsGroup from '../../../../common/components/ActionsGroup';
import { logoutUser } from '../../../../data/actions/auth';
import { REDIRECT_LINKS } from '../../../../common/constants/common';

function UserActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: true });
    dispatch(logoutUser());
    return false;
  }

  return (
    <div className={styles.root}>
      <ActionsGroup
        titleClassName={styles.text}
        actions={[
          {
            id: 'QUIT',
            name: 'Quit',
            icon: <ExitToAppIcon className={styles.icon} />,
            action: handleLogout
          }
        ]}
      />
    </div>
  );
}

export default UserActions;
