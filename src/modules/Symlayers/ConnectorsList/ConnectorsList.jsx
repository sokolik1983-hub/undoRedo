import styles from './ConnectorsList.module.scss';
import ConnectorsListNavigation from './ConnectorsListNavigation/ConnectorsListNavigation';
import ConnectorsListView from './ConnectorsListView/ConnectorsListView';

const ConnectorsList = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Список Юниверсов</div>
      <ConnectorsListNavigation />
      <ConnectorsListView />
    </div>
  );
};

export default ConnectorsList;
