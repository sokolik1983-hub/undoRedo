import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import { getUniverses, setQueryPanelModal } from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';
import ObjectsPanel from './ObjectsPanel';
import Objects from './Objects';
import Filters from './Filters';
import Results from './Results';
import QueryPanelControls from './QueryPanelControls/QueryPanelControls';
import DragNDropProvider from './context/DragNDropContex';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayer, setSemanticLayer] = useState(null);
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(false);
  const [isQueryExecute, setQueryExecute] = useState(false);

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const handleClose = () => {
    return dispatch(setQueryPanelModal(false));
  };

  const handleQueryExecute = () => {
    setQueryExecute(true);
    setTimeout(() => {
      setQueryExecute(false);
    }, 1000);
  };

  const handleShowSelector = () => {
    setSemanticLayerModalOpened(true);
  };

  const onCloseSemanticModalHandler = () => {
    return setSemanticLayerModalOpened(false);
  };

  const onSelectSemanticLayer = value => {
    setSemanticLayer(value);
    setSemanticLayerModalOpened(false);
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <DragNDropProvider>
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
              <Results className={styles.section} title="Просмотр данных" isQueryExecute={isQueryExecute} />
              <QueryPanelControls
                onRun={handleQueryExecute}
                onApply={() => {}}
                onCancel={handleClose}
              />
            </div>
          </div>
        </DragNDropProvider>
        {semanticLayerModalOpened && (
          <SelectSemanticLayer
            visible={semanticLayerModalOpened && true}
            onClose={onCloseSemanticModalHandler}
            onSelectSemanticLayer={onSelectSemanticLayer}
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
