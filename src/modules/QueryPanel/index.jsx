import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import { getUniverses, setQueryPanelModal } from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';
import ObjectsPanel from './ObjectsPanel';
// ↓ временно, пока не вольется модалка Свойства подсказки
import ItemsListModal from './ItemsListModal';
import Objects from './Objects';
import Filters from './Filters';
import Results from './Results';
import QueryPanelControls from './QueryPanelControls/QueryPanelControls';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayer, setSemanticLayer] = useState(null);
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(
    false
  );

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  // ↓ временно, пока не вольется модалка Свойства подсказки
  const [semanticListOpened, setSemanticListOpened] = useState(false);

  const handleClose = () => {
    return dispatch(setQueryPanelModal(false));
  };

  const handleShowSelector = () => {
    setSemanticLayerModalOpened(true);
  };

  // ↓ временно, пока не вольется модалка Свойства подсказки
  const handleShowList = () => {
    return setSemanticListOpened(true);
  };

  const onCloseSemanticModalHandler = () => {
    return setSemanticLayerModalOpened(false);
  };

  // ↓ временно, пока не вольется модалка Свойства подсказки
  const onCloseSemanticListHandler = () => {
    return setSemanticListOpened(false);
  };

  const onSelectSemanticLayer = value => {
    setSemanticLayer(value);
    setSemanticLayerModalOpened(false);
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <ObjectsPanel
              symanticLayer={semanticLayer}
              onToggleClick={handleShowSelector}
            />
          </div>
          <div className={styles.rightPanel}>
            <Objects className={styles.section} title="Объекты отчета" />
            <Filters className={styles.section} title="Фильтры запроса" />
            <Results className={styles.section} title="Просмотр данных" />
            <QueryPanelControls
              onRun={() => {}}
              onApply={() => {}}
              onCancel={handleClose}
              onToggleClick={handleShowList}
            />
          </div>
        </div>
        {semanticLayerModalOpened && (
          <SelectSemanticLayer
            visible={semanticLayerModalOpened && true}
            onClose={onCloseSemanticModalHandler}
            onSelectSemanticLayer={onSelectSemanticLayer}
          />
        )}
        {/* ↓ временно, пока не вольется модалка Свойства подсказки */}
        {semanticListOpened && (
          <ItemsListModal
            visible={semanticListOpened && true}
            onClose={onCloseSemanticListHandler}
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
      onClose={handleClose}
      titleClassName={modalStyles.title}
      dialogClassName={styles.dialog}
      headerClassName={modalStyles.header}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
      withoutTitle
    />
  );
};

export default QueryPanel;

QueryPanel.propTypes = {
  visible: PropTypes.bool.isRequired
};
