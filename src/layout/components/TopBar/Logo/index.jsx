// import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { REDIRECT_LINKS } from '../../../../common/constants/common';
import { PAGE } from '../../../../common/constants/pages';
import { ReactComponent as LogoMain } from '../../../assets/mainLogo.svg';
import styles from './Logo.module.scss';
import DefaultLogo from './DefaultLogo';

function Logo() {
  // const navigate = useNavigate();

  function handleGoHome() {
    window.location.pathname = REDIRECT_LINKS.HOME_PAGE;
    // navigate(REDIRECT_LINKS.HOME_PAGE, { replace: false }); // hard reset page
  }

  const currentPage = useSelector(state => state.app.ui.currentPage);

  const getLogo = () => {
    if (currentPage === PAGE.DASHBOARD) {
      return (
        <div className={styles.logoMain}>
          <LogoMain />
        </div>
      );
    }
    return <DefaultLogo currentPage={currentPage} />;
  };

  return (
    <div className={styles.root} onClick={handleGoHome}>
      {getLogo()}
    </div>
  );
}

export default Logo;
