import {useDispatch} from 'react-redux';

import Dropdown from '../../../../common/components/Dropdown';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import {DEFAULT_USER_ACTIONS} from '../../../../common/constants/common';
import {logoutUser} from '../../../../data/actions/auth';
import AvatarIcon from '../../../assets/miniAvatar.svg';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
    const dispatch = useDispatch();
    const userInfo = window.localStorage.getItem('userInfo');

    const handleLogoutClick = () => {
        dispatch(logoutUser());
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
        <Dropdown trigger={['click']} overlay={menu()}>
            <button type="button" className={styles.mainBtn}>
                <AvatarIcon />
                <span className={styles.note}>{userInfo}</span>
            </button>
        </Dropdown>
    );
};

export default UserMenu;
