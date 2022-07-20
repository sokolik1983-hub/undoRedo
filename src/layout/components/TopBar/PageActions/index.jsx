import { useSelector } from 'react-redux';

import { PAGE } from '@src/common/constants/pages';

import NewReportActions from '../../NewReportActions';
import SemanticActions from './semanticActions';

// для просмотра старой версии ReportActions меняем здесь NewReportActions на ReportActions

const PageActions = () => {
  const currentPage = useSelector((state) => state.app.ui.currentPage);
  switch (currentPage) {
    case PAGE.SEMANTIC:
      return <SemanticActions />;
    case PAGE.REPORT_DESIGNER:
      return <NewReportActions />;
    default:
      return null;
  }
};

export default PageActions;
