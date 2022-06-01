import RecycleBinListNavigationActions from '../RecycleBinListNavigationActions/RecycleBinListNavigationActions';
import TextInput from '../../../../common/components/TextInput';
import ConnectorsListNavigationViewToggler from '../ConnectorsListNavigationViewToggler/ConnectorsListNavigationViewToggler';
import Search from '../../../../common/components/Search';
import { useConnectorsListData } from '../../context/connectorsList';
import styles from './RecycleBinListNavigation.module.scss';

const RecycleBinListNavigation = () => {
  const {
    moveToRootFolder,
    moveToPrevFolder,
    moveToNextFolder,
    actionButtonIsDisable,
    getBreadcrumbs,
    setMultiColumnView,
    searchValue,
    setSearchValue,
    onSearch
  } = useConnectorsListData();

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationActions}>
        <RecycleBinListNavigationActions
          onPrevClick={moveToPrevFolder}
          onNextClick={moveToNextFolder}
          onUpClick={moveToRootFolder}
          actionButtonIsDisable={actionButtonIsDisable}
        />
        <TextInput
          wrapperClassName={styles.breadcrumbsWrapper}
          className={styles.breadcrumbs}
          id="breadcrumbs"
          value={getBreadcrumbs()}
        />
        <ConnectorsListNavigationViewToggler
          showMultipleColumns={setMultiColumnView}
        />
      </div>
      <Search
        className={styles.search}
        onSubmit={onSearch}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default RecycleBinListNavigation;
