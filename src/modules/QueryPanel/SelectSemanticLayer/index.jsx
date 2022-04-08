import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types'
import styles from '../QueryPanel.module.scss';
import selectModalStyles from './SelectSemanticLayer.module.scss';
import Modal from '../../../common/components/Modal';
import IconButton from '../../../common/components/IconButton';
import { getUniverses } from '../../../data/actions/universes';
import { sortFoldersAndItems } from '../../Symlayers/helper';
import Preloader from '../../../common/components/Preloader/Preloader';
import ListItem from '../../../common/components/List/ListItem/ListItem'
import { ReactComponent as FolderIcon } from '../../../layout/assets/folder-icon.svg';
import { ReactComponent as UniverseIcon } from '../../../layout/assets/connector-icon.svg';
import { ReactComponent as ArrowLeftIcon} from '../../../layout/assets/arrow-left.svg';
import { ReactComponent as ArrowUpIcon} from '../../../layout/assets/arrow-up.svg';
import Search from '../../../common/components/Search';

const SelectSemanticLayer = ({ visible, onClose, onSelectSemanticLayer }) => {
  const dispatch = useDispatch();
  const universes = useSelector(state => state.app.data.universes);

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const rootFolder = useMemo(() => {
    if (!universes.children) return universes;
    const sortedConnectorsChildren = sortFoldersAndItems(universes.children);

    return {
      ...universes,
      children: sortedConnectorsChildren
    };
  }, [universes]);

  const [foldersHistory, setFoldersHistory] = useState([rootFolder]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [resArr, setResArr] = useState([]);
  const interArr = [];

  const getNameByKey = (array) => {
    array = array.children ? array.children : array;
    const isNotFolderRes = array.filter(u => !u.isFolder).filter(u => u.name.toUpperCase().includes(searchValue.toUpperCase()));
    if (isNotFolderRes && isNotFolderRes.length > 0) {
      interArr.push(...isNotFolderRes);
      setResArr(interArr);
    }
    const isFolderRes = array.filter(u => u.isFolder && u.children);
    if (isFolderRes && isFolderRes.length > 0) {
      isFolderRes.forEach(folder => {
        return getNameByKey(folder.children);
      });
    }
    return null
  };

  const onSearch = (e) => {
    e.preventDefault();
    
    getNameByKey(universes);
  };

  useEffect(() => {
    setFoldersHistory([rootFolder]);
  }, [universes]);

  useEffect(() => {
    if (!searchValue.length) {
      setResArr([]);
    }    
  }, [searchValue])

  const onFolderDoubleClick = (folder) => {
    const folderWithSortedChildren = {
      ...folder,
      children: sortFoldersAndItems(folder.children)
    };

    setFoldersHistory([
      ...foldersHistory.slice(0, currentFolderIndex + 1),
      folderWithSortedChildren
    ]);
    setCurrentFolderIndex(prev => prev + 1);
  };

  const handleItemClick = (item) => {
    onSelectSemanticLayer(item);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
    setFoldersHistory([rootFolder]);
  };

  const result = resArr.length > 0 ? resArr : foldersHistory[currentFolderIndex]?.children;

  const listItems = result?.map(item => {
    const { isFolder } = item;
    return (
      <div>
        <ListItem
          key={isFolder ? `folder_${item.folder_id}` : item.id}
          name={isFolder ? item.folder_name : item.name}
          icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
          className={selectModalStyles.semanticItem}
          onDoubleClick={
            isFolder ? () => onFolderDoubleClick(item) : () => handleItemClick(item)
          }
        />
      </div>
    )
  });

  const handleClose = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <>
        <div className={currentFolderIndex ? selectModalStyles.navigationActions : selectModalStyles.disNavigationActions}>
          <IconButton
            icon={<ArrowLeftIcon />}
            onClick={currentFolderIndex && moveToPrevFolder}
          />
          <IconButton
            icon={<ArrowUpIcon />}
            onClick={currentFolderIndex && moveToRootFolder}
          />
          <Search
            className={selectModalStyles.search}
            onSubmit={(e) => onSearch(e)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {!lodash.isEmpty(universes) ? (
          listItems?.map(item => item)
        ) : (
          <Preloader />
        )}
      </>
    );
  }
  return (
    <Modal
      title="Выбрать семантический слой"
      content={modalContent()}
      withScroll
      visible={visible}
      onClose={handleClose}
      titleClassName={selectModalStyles.title}
      dialogClassName={selectModalStyles.dialog}
      headerClassName={selectModalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={selectModalStyles.modalContent}
    />
  )
};

export default SelectSemanticLayer;

SelectSemanticLayer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  onSelectSemanticLayer: PropTypes.func
}
