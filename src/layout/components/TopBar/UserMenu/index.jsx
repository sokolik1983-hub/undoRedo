import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import { DEFAULT_USER_ACTIONS } from '../../../../common/constants/common';
import { logoutUser } from '../../../../data/actions/auth';
import UserDefault from '../../../assets/icons/userDefault.svg';
import UserHover from '../../../assets/icons/userHover.svg';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userInfo = window.localStorage.getItem('userInfo');

  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const onVisibleChangeHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action) => {
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
      {DEFAULT_USER_ACTIONS.map((item) => (
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
    <div className={styles.root}>
      <Dropdown
        trigger={['click']}
        overlay={menu()}
        onVisibleChange={onVisibleChangeHandler}
      >
        <button type="button" className={styles.mainBtn}>
          {isOpen ? <UserHover /> : <UserDefault />}
          <span className={styles.note}>{userInfo}</span>
        </button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
