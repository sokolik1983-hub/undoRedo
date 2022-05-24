import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import { logoutUser } from '../../../../data/actions/auth';
import {
  REDIRECT_LINKS,
  DEFAULT_USER_ACTIONS
} from '../../../../common/constants/common';
import { ReactComponent as AvatarIcon } from '../../../assets/miniAvatar.svg';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = window.localStorage.getItem('userInfo');

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: false });
    return false;
  };

  const handleItemClick = action => {
    switch (action) {
      case 'logout':
        handleLogoutClick();
        break;
      default:
        console.log(action);
    }
  };

  const menu = () => (
    <div className={styles.menuContainer}>
      {DEFAULT_USER_ACTIONS.map(item => (
        <DropdownItem
          key={item.title}
          onClick={handleItemClick}
          className={styles.menuItem}
          item={item}
        />
      ))}
    </div>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu()}>
      <button type="button" className={styles.mainBtn}>
        <AvatarIcon />
        <span className={styles.note}>{userInfo}</span>
      </button>
    </Dropdown>
  );
};

export default UserMenu;
