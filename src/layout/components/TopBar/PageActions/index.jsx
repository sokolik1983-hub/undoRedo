import { useSelector } from 'react-redux';
import { PAGE } from '../../../../common/constants/pages';
import SemanticActions from './semanticActions';
import ReportActions from '../../ReportActions';

const PageActions = () => {
  const currentPage = useSelector(state => state.app.ui.currentPage);
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
