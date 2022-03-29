import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import styles from './ObjectsPanel.module.scss';
import { getSymanticLayerData } from '../../../data/actions/universes';

const ObjectsPanel = ({ symanticLayer }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (symanticLayer) dispatch(getSymanticLayerData(symanticLayer.id));
  }, [symanticLayer]);

  const symLayersData = useSelector(state => state.app?.data?.symLayersData);
  const structure = symLayersData?.data?.structure[0];

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters />
      <div className={styles.panelListContainer}>
        <ObjectsPanelList rootFolder={structure} />
      </div>
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  symanticLayer: PropTypes.object
};
