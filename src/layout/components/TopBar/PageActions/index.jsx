import { useSelector } from 'react-redux';
import { PAGE } from '../../../../common/constants/pages';
import SemanticActions from './semanticActions';

const PageActions = () => {
  const currentPage = useSelector(state => state.app.ui.currentPage);
  switch (currentPage) {
    case PAGE.SEMANTIC:
      return <SemanticActions />;
    default: return null;
  }
};

export default PageActions;
