import PropTypes from 'prop-types';
import { useTabContext } from '../Tabs';

export const TabPane = ({ idx, children }) => {
  const { activeTab } = useTabContext();

  return idx === activeTab ? children : null;
};

export default TabPane;

TabPane.propTypes = {
  idx: PropTypes.number,
  children: PropTypes.node
};
