import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types'
import modalStyles from '../../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import styles from '../QueryPanel.module.scss';
import selectModalStyles from './SelectSemanticLayer.module.scss';
import Modal from '../../../common/components/Modal';
import { getUniverses } from '../../../data/actions/universes';
import { sortFoldersAndItems } from '../../Symlayers/helper';
import Preloader from '../../../common/components/Preloader/Preloader';
import ListItem from '../../../common/components/List/ListItem/ListItem'
import { ReactComponent as FolderIcon } from '../../../layout/assets/folder-icon.svg';
import { ReactComponent as UniverseIcon } from '../../../layout/assets/icons/universe-icon.svg';

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

  const handleItemClick = (item) => {
    onSelectSemanticLayer(item);
  }

  const listItems = rootFolder?.children && rootFolder?.children.map(item => {
    const { isFolder } = item;
    return (
      <ListItem
        name={isFolder ? item.folder_name : item.name}
        icon={isFolder ? <FolderIcon /> : <UniverseIcon />}
        className={selectModalStyles.semanticItem}
        onDoubleClick={() => handleItemClick(item)}
      />
    )
  });

  const handleClose = () => {
    return onClose();
  };

  const modalContent = () => {
    return (
      <>
        {!lodash.isEmpty(universes) ? (
          listItems.map(item => item)
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
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  )
};

export default SelectSemanticLayer;

SelectSemanticLayer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  onSelectSemanticLayer: PropTypes.func
}
