import { useSelector } from 'react-redux';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import styles from './ObjectsPanel.module.scss';

const ObjectsPanel = () => {
  const universes = useSelector(state => state.app?.data?.universes);

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters />
      <ObjectsPanelList rootFolder={universes} />
    </div>
  );
};

export default ObjectsPanel;
