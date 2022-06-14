import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import { logoutUser } from '../../../../data/actions/auth';
import { DEFAULT_USER_ACTIONS, REDIRECT_LINKS } from '../../../../common/constants/common';
import { ReactComponent as AvatarIcon } from '../../../assets/miniAvatar.svg';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = window.localStorage.getItem('userInfo');

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: true });
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
