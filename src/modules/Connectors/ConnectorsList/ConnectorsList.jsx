import React, { useSelector } from 'react-redux';
import styles from './ConnectorsList.module.scss';
import ConnectorsListNavigation from './ConnectorsListNavigation';

function ConnectorsList() {
  const connectors = useSelector(state => state.app.data.connectors);

  return (
    <div className={styles.root}>
      <div className={styles.title}>Spisok</div>
      <ConnectorsListNavigation />
      {connectors?.children?.map(item => {
        return <p key={item.id}>{item.connect_name}</p>;
      })}
    </div>
  );
}

export default ConnectorsList;
