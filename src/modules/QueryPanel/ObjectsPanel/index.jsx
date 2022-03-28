import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import styles from './ObjectsPanel.module.scss';

// eslint-disable-next-line no-unused-vars
const ObjectsPanel = ({ semanticLayer }) => {
  // TODO: remove this useSelector, semanticLayer should use as correct data
  const universes = useSelector(state => state.app?.data?.universes);

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters />
      {/* <div>{semanticLayer?.name}</div> */}
      {/* TODO: add correct semanticLayer as prop to ObjectsPanelList rootFolder */}
      <ObjectsPanelList rootFolder={universes} />
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  semanticLayer: PropTypes.object
};
