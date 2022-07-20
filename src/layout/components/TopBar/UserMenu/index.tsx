import React from 'react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import {
  DEFAULT_USER_ACTIONS,
  IDefaultUserActions,
} from '../../../../common/constants/common';
import { logoutUser } from '../../../../data/actions/auth';
import UserDefault from '../../../assets/icons/userDefault.svg';
import UserHover from '../../../assets/icons/userHover.svg';
import styles from './UserMenu.module.scss';

const UserMenu: FC = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const onVisibleChangeHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action: string) => {
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
        // @ts-ignore
        <DropdownItem
          key={item.title}
          onClick={() => handleItemClick(item.action)}
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
        placement={undefined}
        alignPoint={undefined}
      >
        <button type="button" className={styles.mainBtn}>
          {isOpen ? <UserHover /> : <UserDefault />}
        </button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
