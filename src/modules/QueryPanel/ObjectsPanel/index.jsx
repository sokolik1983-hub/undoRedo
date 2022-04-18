import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
import { getSymanticLayerData } from '../../../data/actions/universes';
import usePanelListFilters from './usePanelListFilters';
import styles from './ObjectsPanel.module.scss';

const ObjectsPanel = ({ symanticLayer, modalOpenHandler, showHeader }) => {
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

  return (
    <div className={styles.root}>
      {showHeader && (
        <>
          <ObjectsPanelHeader modalOpenHandler={modalOpenHandler} />
          <Divider color="#0D6CDD" />
        </>
      )}

      <ObjectsPanelFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filterId={filterTypeId}
        onFiltersSwitch={handleFiltersSwitch}
      />
      <div className={styles.panelListContainer}>
        {rootFolder && <ObjectsPanelList rootFolder={rootFolder} />}
      </div>
    </div>
  );
};

export default ObjectsPanel;

ObjectsPanel.propTypes = {
  symanticLayer: PropTypes.object,
  modalOpenHandler: PropTypes.func,
  showHeader: PropTypes.bool
};
