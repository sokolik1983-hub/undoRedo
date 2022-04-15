import PropTypes from 'prop-types';
import { ReactComponent as LogoDefault } from '../../../../assets/defaultLogo.svg';
import { ReactComponent as SemanticLogo } from '../../../../assets/semanticLogo.svg';
import { ReactComponent as ConnectorsLogo } from '../../../../assets/connectorsLogo.svg';
import { ReactComponent as DesignerLogo } from '../../../../assets/designerLogo.svg';
import styles from '../Logo.module.scss';
import { PAGE } from '../../../../../common/constants/pages';
import { PAGE_TITLES } from '../../../../../common/constants/common';

// eslint-disable-next-line react/prop-types
const DefaultLogo = ({ currentPage }) => {

  const getPageName = () => {
    switch (currentPage) {
      case PAGE.AUDIT:
        return PAGE_TITLES.AUDIT;
      case PAGE.TRASH:
        return PAGE_TITLES.TRASH;
      case PAGE.CONNECTORS:
        return PAGE_TITLES.CONNECTORS;
      case PAGE.SEMANTIC:
        return PAGE_TITLES.SEMANTIC;
      case PAGE.REPORT_DESIGNER:
        return PAGE_TITLES.REPORT_DESIGNER
      default: return null;
    }
  };

  const getPageIcon = () => {
    switch (currentPage) {
      case PAGE.SEMANTIC:
        return <SemanticLogo />;
      case PAGE.CONNECTORS:
        return <ConnectorsLogo />;
      case PAGE.REPORT_DESIGNER:
        return <DesignerLogo />;
      default: return null;
    }
  };

  return (
    <div className={styles.defaultLogoWrapper}>
      <div className={styles.logoContainer}>
        <LogoDefault />
        <div className={styles.pageTitle}>
          { getPageName() }
        </div>
      </div>
      <div className={styles.pageLogo}>
        { getPageIcon() }
      </div>
    </div>
  )
};

export default DefaultLogo;


DefaultLogo.prototype = {
  currentPage: PropTypes.string,
}
