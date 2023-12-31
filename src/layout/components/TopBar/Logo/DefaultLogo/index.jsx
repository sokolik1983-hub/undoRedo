import PropTypes from 'prop-types';

import { PAGE_TITLES } from '../../../../../common/constants/common';
import { PAGE } from '../../../../../common/constants/pages';
import AdminLogo from '../../../../assets/adminHeader.svg';
import ConnectorsLogo from '../../../../assets/connectorsLogo.svg';
import LogoDefault from '../../../../assets/defaultLogo.svg';
import DesignerLogo from '../../../../assets/designerLogo.svg';
import SemanticLogo from '../../../../assets/semanticLogo.svg';
import styles from '../Logo.module.scss';

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
      case PAGE.SEMANTIC_LIST:
        return PAGE_TITLES.SEMANTIC;
      case PAGE.REPORT_DESIGNER:
        return PAGE_TITLES.REPORT_DESIGNER;
      case PAGE.ADMIN:
        return PAGE_TITLES.ADMIN;
      case PAGE.REPORTS:
        return PAGE_TITLES.REPORTS;
      default:
        return null;
    }
  };

  const getPageIcon = () => {
    switch (currentPage) {
      case PAGE.SEMANTIC:
        return <SemanticLogo />;
      case PAGE.SEMANTIC_LIST:
        return <SemanticLogo />;
      case PAGE.CONNECTORS:
        return <ConnectorsLogo />;
      case PAGE.REPORTS:
        return <DesignerLogo />;
      case PAGE.REPORT_DESIGNER:
        return <DesignerLogo />;
      case PAGE.ADMIN:
        return <AdminLogo />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.defaultLogoWrapper}>
      <div className={styles.logoContainer}>
        <LogoDefault />
        <div className={styles.pageTitle}>{getPageName()}</div>
      </div>
      <div className={styles.pageLogo}>{getPageIcon()}</div>
    </div>
  );
};

export default DefaultLogo;

DefaultLogo.prototype = {
  currentPage: PropTypes.string,
};
