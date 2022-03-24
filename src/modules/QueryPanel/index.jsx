import { useState } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Button from '../../common/components/Button';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import { setQueryPanelModal } from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(false);

  const closeHandler = () => {
    return dispatch(setQueryPanelModal(false));
  };

  const handleShowSelector = () => {
    return setSemanticLayerModalOpened(true);
  }

  const onCloseSemanticModalHandler = () => {
    return  setSemanticLayerModalOpened(false);
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <Button type="button" onClick={handleShowSelector}>
              Select universe
            </Button>
            Панель с объектами семантического слоя
          </div>
          <div className={styles.rightPanel}>
            <div className={styles.section}>objects</div>
            <div className={styles.section}>filters</div>
            <div className={styles.section}>results</div>
          </div>
        </div>
        {semanticLayerModalOpened && (
          <SelectSemanticLayer
            visible={semanticLayerModalOpened && true}
            onClose={onCloseSemanticModalHandler}
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      title="Панель запросов"
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={closeHandler}
      titleClassName={modalStyles.title}
      dialogClassName={styles.dialog}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
    />
  );
}

export default QueryPanel;

QueryPanel.propTypes = {
  visible: PropTypes.bool.isRequired
}
