/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import styles from './ObjectsPanel.module.scss';
import { getSymanticLayerData } from '../../../data/actions/universes';

const ObjectsPanel = ({ symanticLayer, onToggleClick }) => {
  const dispatch = useDispatch();
  const symLayersData = useSelector(state => state.app?.data?.symLayersData);
  const structure = symLayersData?.data?.structure[0]?.children;

  useEffect(() => {
    if (symanticLayer) dispatch(getSymanticLayerData(symanticLayer.id)); 
  }, [symanticLayer]);

  /**
   * Собственный стейт компонента
  */
  const [filterName, setFilterName] = useState('');
  const [filterId, setFilterId] = useState([]);

  /**
   * Отфильтрованный по имени и objectType_id массив списка
  */
  const filteredStructure = structure
    ?.filter(item =>
      item?.field.toLowerCase().includes(filterName?.toLowerCase())
    )
    .filter(item => {
      if (!filterId.length) return true;
      return filterId.includes(item.objectType_id);
    });

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader onToggleClick={onToggleClick} />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters
        setFilterName={setFilterName}
        value={filterName}
        setFilterId={setFilterId}
        filterId={filterId}
      />
      <div className={styles.panelListContainer}>
        <ObjectsPanelList rootFolder={filteredStructure} />
      </div>
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  symanticLayer: PropTypes.object,
  onToggleClick: PropTypes.func
};
