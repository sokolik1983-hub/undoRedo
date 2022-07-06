import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import usePanelListFilters from './usePanelListFilters';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import { useDragNDrop } from '../context/DragNDropContext';
import styles from './ObjectsPanel.module.scss';

const ObjectsPanel = ({ modalOpenHandler }) => {
  const currentLayer = useSelector(state => {
    const {
      data,
      currentLayerTitle
    } = state.app?.data?.queryPanelSymlayersData;

    return data.find(i => i.queryTitle === currentLayerTitle);
  });

  const {
    rootFolder,
    filterType,
    handleFiltersSwitch,
    searchValue,
    setSearchValue
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

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  modalOpenHandler: PropTypes.func
};
