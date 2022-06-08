/* eslint-disable import/no-cycle */
import PropTypes from 'prop-types';
import { createContext, useState, Children, useContext } from 'react';
import TabsItem from './TabsItem/TabsItem';
import styles from './Tabs.module.scss';

export const ActiveTabContext = createContext();
export const useTabContext = () => useContext(ActiveTabContext);

export const Tabs = ({ defaultActive, children }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const arrayChildren = Array.isArray(children)
    ? children
    : Children.toArray(children);

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles.tabsContainer}>
        <ul className={styles.tabsHeader}>
          {arrayChildren.map(child => (
            <TabsItem
              key={child.props.tab}
              idx={child.props.idx}
              tab={child.props.tab}
            />
          ))}
        </ul>
        <div className={styles.tabsContent}>{children}</div>
      </div>
    </ActiveTabContext.Provider>
  );
};

Tabs.propTypes = {
  defaultActive: PropTypes.string,
  children: PropTypes.node
};
