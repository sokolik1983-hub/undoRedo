import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import styles from './HomePage.module.scss';
import { setCurrentPage } from '../../data/reducers/ui';
import { DASHBOARD_PAGE } from '../../common/constants/pages';
import navigationMenu from '../../navigation';
import UserMenu from './UserMenu';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(DASHBOARD_PAGE));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.userMenuWrapper}>
        <UserMenu />
      </div>
      <p>Недавние документы</p>
      <div className={styles.section}>
        <i className="fas fa-user" />
        <RouterLink to="/Reporting/report/create">
          <div className={styles.button}>
            <NoteAddIcon />
            <div className={styles['button_text']}>отчет1</div>
          </div>
        </RouterLink>
        <RouterLink to="/Reporting/report/create">
          <div className={styles.button}>
            <NoteAddIcon />
            <div className={styles['button_text']}>отчет2</div>
          </div>
        </RouterLink>
      </div>
      <hr />
      <p>Избранное</p>
      <div className={styles.section}>
        <i className="fas fa-user" />
        <RouterLink to="/Reporting/report/create">
          <div className={styles.button}>
            <NoteAddIcon />
            <div className={styles['button_text']}>создать отчет</div>
          </div>
        </RouterLink>
      </div>
      <hr />
      <p>Приложения</p>
      <div className={styles.section}>
        {navigationMenu &&
          navigationMenu.map(menuItem => (
            <RouterLink to={menuItem.href} key={menuItem.id}>
              <div className={styles.button}>
                {menuItem.icon}
                <div className={styles['button_text']}>{menuItem.title}</div>
              </div>
            </RouterLink>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
