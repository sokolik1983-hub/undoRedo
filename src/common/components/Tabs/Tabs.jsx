import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Children, createContext, useContext, useState } from 'react';

import styles from './Tabs.module.scss';
import TabsItem from './TabsItem/TabsItem';

export const ActiveTabContext = createContext();
export const useTabContext = () => useContext(ActiveTabContext);

const Tabs = ({
  defaultActive,
  children,
  tabItemClassName,
  tabsContainerClass,
  tabsContentClass,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const arrayChildren = Array.isArray(children)
    ? children
    : Children.toArray(children);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={clsx(styles.tabsContainer, tabsContainerClass)}>
        <ul className={styles.tabsHeader}>
          {arrayChildren.map((child) => (
            <TabsItem
              className={tabItemClassName}
              key={child.props.tab}
              idx={child.props.idx}
              tab={child.props.tab}
            />
          ))}
        </ul>
        <div className={clsx(styles.tabsContent, tabsContentClass)}>
          {children}
        </div>
      </div>
    </ActiveTabContext.Provider>
  );
};

export default Tabs;

Tabs.propTypes = {
  defaultActive: PropTypes.string,
  children: PropTypes.node,
  tabItemClassName: PropTypes.string,
  tabsContainerClass: PropTypes.string,
  tabsContentClass: PropTypes.string,
};
