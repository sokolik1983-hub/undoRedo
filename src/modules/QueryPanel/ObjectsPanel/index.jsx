import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ObjectsPanelHeader from './ObjectsPanelHeader/ObjectsPanelHeader';
import Divider from '../../../common/components/Divider';
import usePanelListFilters from './usePanelListFilters';
import ObjectsPanelFilters from './ObjectsPanelFilters/ObjectsPanelFilters';
import ReportObjectsPanelFilters from './ReportObjectsPanelFilters';
import ObjectsPanelList from './ObjectsPanelList/ObjectsPanelList';
// import { getSymanticLayerData } from '../../../data/actions/universes';
import { useDragNDrop } from '../context/DragNDropContext';
import styles from './ObjectsPanel.module.scss';

const ObjectsPanel = ({ modalOpenHandler, showHeader, report }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (symanticLayer) dispatch(getSymanticLayerData(symanticLayer.id));
  // }, [symanticLayer]);

  const symLayersData = useSelector(state => state.app?.data?.symLayersData);

  const rootClasses = clsx(
    styles.root,
    { [styles.report]: report }
  );

  const {
    rootFolder,
    filterTypeId,
    handleFiltersSwitch,
    searchValue,
    setSearchValue
  } = usePanelListFilters(symLayersData?.data?.structure[0]);

  const { handleDragOver, handleTreeDrop } = useDragNDrop();

  return (
    <div className={rootClasses}>
      {showHeader && (
        <>
          <ObjectsPanelHeader modalOpenHandler={modalOpenHandler} />
          <Divider color="#0D6CDD" />
        </>
      )}
      {report ? (
        <ReportObjectsPanelFilters
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        ) : (
          <ObjectsPanelFilters
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            filterId={filterTypeId}
            onFiltersSwitch={handleFiltersSwitch}
          />
            )}
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
  modalOpenHandler: PropTypes.func,
  showHeader: PropTypes.bool,
  report: PropTypes.bool,
};
