import PropTypes from 'prop-types';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import Divider from '../../../common/components/Divider';
import { useDragNDrop } from '../context/DragNDropContext';
import styles from './ObjectsPanel.module.scss';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import usePanelListFilters from './usePanelListFilters';

const ObjectsPanel = ({ modalOpenHandler }) => {
  const currentLayer = useSelector((state) => {
    const { data, currentLayerTitle } =
      state.app?.reportDesigner?.queryPanelData;

    return data.find((i) => i.queryTitle === currentLayerTitle);
  });

  const {
    rootFolder,
    filterType,
    handleFiltersSwitch,
    searchValue,
    setSearchValue,
  } = usePanelListFilters(currentLayer?.symLayerData);

  const { handleDragOver, handleTreeDrop } = useDragNDrop();

  return (
    <div className={styles.root}>
      <ObjectsPanelHeader modalOpenHandler={modalOpenHandler} />
      <Divider color="#0D6CDD" />
      <ObjectsPanelFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filterType={filterType}
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

export default memo(ObjectsPanel);

ObjectsPanel.propTypes = {
  modalOpenHandler: PropTypes.func,
};
