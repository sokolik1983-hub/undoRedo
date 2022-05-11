import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import { getSymanticLayerData } from '../../../data/actions/universes';
import { usePanelListFilters } from './usePanelListFilters';
import { useDragNDrop } from '../context/DragNDropContex';
import styles from './ObjectsPanel.module.scss';

const ObjectsPanel = ({ symanticLayer, modalOpenHandler }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (symanticLayer) dispatch(getSymanticLayerData(symanticLayer.id));
  }, [symanticLayer]);

  const symLayersData = useSelector(state => state.app?.data?.symLayersData);

  const {
    rootFolder,
    filterTypeId,
    handleFiltersSwitch,
    searchValue,
    setSearchValue
  } = usePanelListFilters(symLayersData?.data?.structure[0]);

  const { handleDragOver, handleTreeDrop } = useDragNDrop();

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader modalOpenHandler={modalOpenHandler} />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filterId={filterTypeId}
        onFiltersSwitch={handleFiltersSwitch}
      />
      <div
        className={styles.panelListContainer}
        onDragOver={handleDragOver}
        onDrop={handleTreeDrop}
      >
        {rootFolder && <ObjectsPanelList rootFolder={rootFolder} />}
      </div>
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  symanticLayer: PropTypes.object,
  modalOpenHandler: PropTypes.func
};
