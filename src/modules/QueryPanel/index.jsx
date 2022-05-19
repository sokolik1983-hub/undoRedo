import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import {
  createQuery,
  getUniverses,
  setConfirmModal,
  setQueryPanelModal
} from '../../data/actions/universes';
import SelectSemanticLayer from './SelectSemanticLayer';
import SqlPopup from './SqlPopup';
import ObjectsPanel from './ObjectsPanel';
import Objects from './Objects';
import Filters from './Filters';
import Results from './Results';
import QueryPanelControls from './QueryPanelControls/QueryPanelControls';
import DragNDropProvider from './context/DragNDropContext';

import ModalConfirm from '../../common/components/Modal/ModalConfirm';
import { getCondition } from './helper';
import { setSymanticLayerData } from '../../data/reducers/data';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayer, setSemanticLayer] = useState(null);
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(
    false
  );
  const [isQueryExecute, setQueryExecute] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isSqlPopupOpened, setSqlPopupOpened] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [objects, setObjects] = useState([]);
  const [filters, setFilters] = useState([]);
  const [errorText, setError] = useState('');

  const symLayerData = useSelector(state => state.app?.data?.symLayersData);

  const confirmModalOpened = useSelector(
    state => state.app.ui.confirmModalVisible
  );

  useEffect(() => {
    dispatch(getUniverses());
  }, []);

  const handleClose = () => {
    return isChanged
      ? dispatch(setConfirmModal(true))
      : dispatch(setQueryPanelModal(false));
  };

  const handleObjFilEdit = (objs, fils) => {
    setObjects(objs);
    setFilters(fils);
  }

  const handleQueryExecute = () => {
    setQueryExecute(true);
    setTimeout(() => {
      setQueryExecute(false);
    }, 1000);
  };

  const handleShowSqlPopup = () => {
    setSqlPopupOpened(!isSqlPopupOpened);
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
    setIsChanged(true);
  };

  const handleQueryText = (text) => {
    setQueryText(text);
  };

  const onClose = () => {
    dispatch(setQueryPanelModal(false));
    dispatch(setConfirmModal(false));
    dispatch(setSymanticLayerData(null));
  };

  const createQueryText = () => {
    if (objects) {
      dispatch(createQuery({
        symlayer_id: symLayerData.symlayer_id,
        data: objects.map(item => `${item.parent_folder}.${item.field}`),
        conditions: filters ? getCondition([filters]) : {} 
      }));
    }
  }

  useEffect(() => {
    const resultConditions = filters ? getCondition([filters]) : {};
    if (resultConditions === 'Empty Value') {
      setError('Пустые фильтры');
    } else if (isSqlPopupOpened) {
      setError('');
      createQueryText();
    } else {
      setQueryText('');
    }
  }, [isSqlPopupOpened])

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <DragNDropProvider>
          <div className={styles.content}>
            <div className={styles.leftPanel}>
              <ObjectsPanel
                symanticLayer={semanticLayer}
                modalOpenHandler={handleShowSelector}
              />
            </div>
            <div className={styles.rightPanel}>
              <Objects className={styles.section} />
              <Filters className={styles.section} />
              <Results
                className={styles.section}
                title="Просмотр данных"
                isQueryExecute={isQueryExecute}
                onQueryTextCreate={handleQueryText}
                onObjFilEdit={handleObjFilEdit}
              />
              <span style={{color: 'red'}}>{errorText}</span>
              <QueryPanelControls
                onRun={handleQueryExecute}
                onSql={handleShowSqlPopup}
                onApply={handleClose} // todo применить функционал переноса в отчет
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
        {confirmModalOpened && (
          <ModalConfirm
            style={{'top': 1}}
            onReturn={() => dispatch(setConfirmModal(false))}
            onClose={() => onClose()}
          />
        )}
        {isSqlPopupOpened && !errorText.length && (
          <SqlPopup 
            onClose={handleShowSqlPopup}
            queryText={queryText}
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
