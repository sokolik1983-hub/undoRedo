import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {REDIRECT_LINKS} from '../../../../common/constants/common';
import {PAGE} from '../../../../common/constants/pages';
import LogoMain from '../../../assets/mainLogo.svg';
import DefaultLogo from './DefaultLogo';
import styles from './Logo.module.scss';

function Logo() {
    const navigate = useNavigate();

    function handleGoHome() {
        navigate(REDIRECT_LINKS.HOME_PAGE, {replace: false});
    }

    const currentPage = useSelector((state) => state.app.ui.currentPage);

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
