import React from 'react';
import { useSelector } from 'react-redux';
import UserActions from './UserActions';
import styles from './TopBar.module.scss';
import Logo from './Logo';
import PageDescription from './PageDescription';
import LoadingIndicator from './LoadingIndicator';
import MenuButton from './MenuButton';
import ReportActions from '../ReportActions';
import { REPORT_DESIGNER_PAGE } from '../../../common/constants/pages';

function TopBar() {
  const ui = useSelector(state => state.app.ui);
  const auth = useSelector(state => state.app.auth);

  return (
    <header className={styles.header}>
      <Logo />
      {auth && auth.isAuth && <MenuButton />}
      {ui.currentPage === REPORT_DESIGNER_PAGE && <ReportActions />}
      {ui.currentPage !== REPORT_DESIGNER_PAGE && <PageDescription />}
      <LoadingIndicator />
      {auth && auth.isAuth && <UserActions />}
    </header>
  );
}

export default TopBar;
