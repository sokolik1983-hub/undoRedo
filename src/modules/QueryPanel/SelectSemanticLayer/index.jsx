import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types'
import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import styles from '../QueryPanel.module.scss';
import selectModalStyles from './SelectSemanticLayer.module.scss';
import Modal from '../../../common/components/Modal';
import IconButton from '../../../common/components/IconButton';
import { getUniverses } from '../../../data/actions/universes';
import { sortFoldersAndItems } from '../../Symlayers/helper';
import Preloader from '../../../common/components/Preloader/Preloader';
import ListItem from '../../../common/components/List/ListItem/ListItem'
import { ReactComponent as FolderIcon } from '../../../layout/assets/folder-icon.svg';
import { ReactComponent as UniverseIcon } from '../../../layout/assets/icons/universe-icon.svg';
import { ReactComponent as ArrowLeftIcon} from '../../../layout/assets/arrow-left.svg';
import { ReactComponent as ArrowUpIcon} from '../../../layout/assets/arrow-up.svg';

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
    console.log(item);
    onSelectSemanticLayer(item);
  };

  const moveToPrevFolder = () => {
    setCurrentFolderIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const moveToRootFolder = () => {
    setCurrentFolderIndex(0);
    setFoldersHistory([rootFolder]);
  };


  const listItems = foldersHistory[currentFolderIndex]?.children?.map(item => {
    const { isFolder } = item;
    return (
      <ListItem
        key={isFolder ? `folder_${item.folder_id}` : item.id}
        name={isFolder ? item.folder_name : item.name}
        icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
        className={selectModalStyles.semanticItem}
        onDoubleClick={
          isFolder ? () => onFolderDoubleClick(item) : () => handleItemClick(item)
        }
      />
    )
  });

  const handleClose = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <>
        <div className={selectModalStyles.navigationActions}>
          <IconButton
            icon={<ArrowLeftIcon style={{fill: 'white'}} />}
            onClick={moveToPrevFolder}
          />
          <IconButton
            icon={<ArrowUpIcon style={{fill: 'white'}} />}
            onClick={moveToRootFolder}
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
      titleClassName={modalStyles.title}
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
