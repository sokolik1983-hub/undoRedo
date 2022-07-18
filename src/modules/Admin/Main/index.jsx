import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TabPane from '../../../common/components/Tabs/TabPane/TabPane';
import Tabs from '../../../common/components/Tabs/Tabs';
import { PAGE } from '../../../common/constants/pages';
import { setCurrentPage } from '../../../data/reducers/ui';
import Roles from '../Roles';
import Services from '../Services';
import Users from '../Users';
import styles from './Main.module.scss';

function AdminMain() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(PAGE.ADMIN));
  }, []);

  const tab = (isActive, title) => (isActive ? <div>{title}</div> : title);

  return (
    <div className={styles.root}>
      <Tabs
        defaultActive="1"
        tabItemClassName={styles.tabItem}
        tabsContainerClass={styles.tabsContainer}
        tabsContentClass={styles.tabsContent}
      >
        <TabPane tab={(isActive) => tab(isActive, 'Сервисы')} idx="1">
          <Services />
        </TabPane>
        <TabPane tab={(active) => tab(active, 'Роли')} idx="2">
          <Roles />
        </TabPane>
        <TabPane tab={(active) => tab(active, 'Пользователи')} idx="3">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminMain;
