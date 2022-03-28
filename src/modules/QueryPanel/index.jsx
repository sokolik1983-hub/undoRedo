/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Button from '../../common/components/Button';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import { getUniverses, setQueryPanelModal } from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';
import ObjectsPanel from './ObjectsPanel';
import Objects from './Objects';
import Filters from './Filters';
import Results from './Results';
import QueryPanelControls from './QueryPanelControls/QueryPanelControls';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(
    false
  );

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const handleCloseModal = () => {
    return dispatch(setQueryPanelModal(false));
  };

  const handleShowSelector = () => {
    return setSemanticLayerModalOpened(true);
  };

  const onCloseSemanticModalHandler = () => {
    return setSemanticLayerModalOpened(false);
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.leftPanel}>
            <ObjectsPanel />
            <Button type="button" onClick={handleShowSelector}>
              Select universe
            </Button>
          </div>
          <div className={styles.rightPanel}>
            <Objects className={styles.section} title="Объекты отчета" />
            <Filters className={styles.section} title="Фильтры запроса" />
            <Results className={styles.section} title="Просмотр данных" />
            <QueryPanelControls
              onRun={() => {}}
              onApply={() => {}}
              onCancel={handleCloseModal}
            />
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
      onClose={handleCloseModal}
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
