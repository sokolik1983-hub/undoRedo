import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import { logoutUser } from '../../../data/actions/auth';
import { REDIRECT_LINKS } from '../../../common/constants/common';
import AvatarIcon from '../../../layout/assets/miniAvatar.svg';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = window.localStorage.getItem('userInfo');

  const handleClick = () => {
    console.log('menu clicked');
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate(REDIRECT_LINKS.LOGIN_PAGE, { replace: false });
    return false;
  };

  const mainButton = () => {
    return (
      <div className={styles.mainButton}>
        <div>
          <img src={AvatarIcon} alt="Avatar" />
        </div>
        <div className={styles.mainButtonRight}>
          <span>{JSON.parse(userInfo).user_login}</span>
        </div>

      </div>
    )
  };

  return (
    <Dropdown mainButton={mainButton()} itemsWrapper={styles.itemsWrapper}>
      <DropdownItem onClick={handleClick} className={styles.menuItem} title='Профиль' text='Профиль' />
      <DropdownItem onClick={handleClick} className={styles.menuItem} title='Печать' text='Печать' />
      <DropdownItem onClick={handleClick} className={styles.menuItem} title='Обмен метаданными' text='Обмен метаданными' />
      <DropdownItem onClick={handleClick} className={styles.menuItem} title='Настройки' text='Настройка' />
      <DropdownItem onClick={handleClick} className={styles.menuItem} title='Смена пользователя' text='Смена пользователя' />
      <DropdownItem onClick={handleLogoutClick} className={styles.menuItem} title='Выход' text='Выход' />
    </Dropdown>
  )
};

export default UserMenu;
