import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTabContext } from '../Tabs';
import styles from './TabsItem.module.scss';

const TabsItem = ({ className, idx, tab }) => {
  const { activeTab, setActiveTab } = useTabContext();

  const tabContent = typeof tab === 'string' ? tab : tab(idx === activeTab);

  const tabsItem = clsx(styles.tabsItem, {
    [styles.active]: idx === activeTab
  });

  const tabItemContainer = clsx(styles.tabItemContainer, className);

  return (
    <li className={tabsItem}>
      <div className={tabItemContainer} onClick={() => setActiveTab(idx)}>
        {tabContent}
      </div>
    </li>
  );
};

export default TabsItem;

TabsItem.propTypes = {
  className: PropTypes.string,
  idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tab: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
