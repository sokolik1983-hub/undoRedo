import { useSelector } from 'react-redux';

import { PAGE } from '../../../../common/constants/pages';
import ReportActions from '../../ReportActions';
import SemanticActions from './semanticActions';

const PageActions = () => {
  const currentPage = useSelector((state) => state.app.ui.currentPage);
  switch (currentPage) {
    case PAGE.SEMANTIC:
      return <SemanticActions />;
    case PAGE.SEMANTIC_LIST:
      return <SemanticActions />;
    case PAGE.REPORT_DESIGNER:
      return <ReportActions />;
    default:
      return null;
  }
};

export default PageActions;
