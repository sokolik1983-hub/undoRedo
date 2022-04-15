import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types'
import selectModalStyles from './SelectSemanticLayer.module.scss';
import Modal from '../../../common/components/Modal';
import IconButton from '../../../common/components/IconButton';
import { getUniverses } from '../../../data/actions/universes';
import { sortFoldersAndItems } from '../../Symlayers/helper';
import Preloader from '../../../common/components/Preloader/Preloader';
import ListItem from '../../../common/components/List/ListItem/ListItem'
import { ReactComponent as FolderIcon } from '../../../layout/assets/folderIcon.svg';
import { ReactComponent as UniverseIcon } from '../../../layout/assets/connectorIcon.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../layout/assets/arrowLeft.svg';
import { ReactComponent as ArrowUpIcon } from '../../../layout/assets/arrow-up.svg';
import { ReactComponent as ReloadIcon } from '../../../layout/assets/queryPanel/reload.svg';
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
  const [searchExec, setSearchExec] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [tempArr, setTempArr] = useState([]);

  let interArr = [];

  const searchSymLayer = (array) => {
    const univArray = array.children ? array.children : array;
    const isRes = univArray.filter(univ => {
      const name = univ.name ? univ.name : univ.folder_name;
      return name?.toUpperCase().includes(searchValue.toUpperCase())
    });
    
    if (isRes && isRes.length > 0) {
      interArr.push(...isRes);
      interArr = sortFoldersAndItems(interArr);
      setResArr(interArr);
      setTempArr(interArr);
    }
    const isFolderRes = univArray.filter(univ => univ.isFolder && univ.children);
    if (isFolderRes && isFolderRes.length > 0) {
      isFolderRes.forEach(folder => {
        searchSymLayer(folder.children);
      });
    }
  };


  const onSearch = (e, arr) => {
    e.preventDefault();
    setCurrentFolderIndex(0);
    setResArr([]);
    setTempArr([]);
    if (searchValue.length) {
      setSearchExec(true); 
      searchSymLayer(arr);
    } else {
      setSearchExec(false);
    } 
  };

  useEffect(() => {
    if (!searchExec) {
      setResArr([]);
      setFoldersHistory([rootFolder]);
    }
  }, [searchExec]);

  useEffect(() => {
    setFoldersHistory([rootFolder]);
  }, [universes]);

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

  const result = searchExec ? resArr : foldersHistory[currentFolderIndex]?.children;

  useEffect(() => {
    setNavActive(!!currentFolderIndex);
    if (currentFolderIndex && searchExec) {
      setResArr(foldersHistory[currentFolderIndex]?.children);
    }
    if (!currentFolderIndex && searchExec) {
      setResArr(tempArr);
    }
  }, [currentFolderIndex]);

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

  const onReload = () => {
    setSearchExec(false);
    setResArr([]);
    interArr = [];
    setSearchValue('');
    setCurrentFolderIndex(0);
    setFoldersHistory([rootFolder]); 
  };

  const modalContent = () => {
    return (
      <>
        <div className={navActive ? selectModalStyles.navigationActions : selectModalStyles.disNavigationActions}>
          <IconButton
            icon={<ArrowLeftIcon />}
            onClick={navActive && moveToPrevFolder}
          />
          <IconButton
            icon={<ArrowUpIcon />}
            onClick={navActive && moveToRootFolder}
          />
          <Search
            className={selectModalStyles.search}
            onSubmit={(e) => onSearch(e, result)}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconButton
            className={selectModalStyles.reloadIcon}
            icon={<ReloadIcon />}
            onClick={onReload}
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
      bodyClassName={selectModalStyles.modalBody}
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
