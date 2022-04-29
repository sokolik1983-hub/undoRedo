/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
// import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import { logoutUser } from '../../../../data/actions/auth';
import {
  REDIRECT_LINKS,
  DEFAULT_USER_ACTIONS
} from '../../../../common/constants/common';
import { ReactComponent as AvatarIcon } from '../../../assets/miniAvatar.svg';
import styles from './UserMenu.module.scss';
import Dropdown from '../../../../common/components/NewDropdown/Dropdown';
import IconButton from '../../../../common/components/IconButton';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = window.localStorage.getItem('userInfo');

  const mainButton = () => {
    return (
      <div className={styles.mainButton}>
        <div>
          <AvatarIcon />
        </div>
        <div className={styles.mainButtonRight}>
          <span>{JSON.parse(userInfo).user_login}</span>
        </div>
      </div>
    );
  };

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

  const makingItems = () => {
    return DEFAULT_USER_ACTIONS.map(item => {
      return (
        <DropdownItem
          onClick={handleItemClick}
          className={styles.menuItem}
          item={item}
        />
      );
    });
  };

  // return (
  //   <Dropdown mainButton={mainButton()} itemsWrapper={styles.itemsWrapper}>
  //     {makingItems()}
  //   </Dropdown>
  // );

  const menu = () => (
    <div className={styles.menuContainer}>
      {DEFAULT_USER_ACTIONS.map(item => (
        <DropdownItem
          onClick={handleItemClick}
          className={styles.menuItem}
          item={item}
        />
      ))}
    </div>
  );

  return (
    <Dropdown menu={menu()}>
      <button type="button" className={styles.mainBtn}>
        <AvatarIcon />
        <span className={styles.note}>{JSON.parse(userInfo).user_login}</span>
      </button>
    </Dropdown>
  );
};

export default UserMenu;
