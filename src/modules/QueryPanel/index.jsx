/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './QueryPanel.module.scss';
import Modal from '../../common/components/Modal';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import {
  createQuery,
  getQueryPanelSymanticLayerData,
  getResultFromQuery,
  getUniverses,
  postQueryPanelTab,
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
import data, { setSymanticLayerData } from '../../data/reducers/data';
import { showToast } from '../../data/actions/app';
import { EMPTY_STRING, TOAST_TYPE } from '../../common/constants/common';
import {
  FILTER_TYPES,
  FILTER_TYPES_ARR
} from './Filters/FiltersDeskItem/constants';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] = useState(
    false
  );
  const [isQueryExecute, setQueryExecute] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isSqlPopupOpened, setSqlPopupOpened] = useState(false);
  const [queryText, setQueryText] = useState(EMPTY_STRING);
  const [objects, setObjects] = useState([]);
  const [filters, setFilters] = useState([]);
  const [errorText, setError] = useState(EMPTY_STRING);

  const {
    dpObjects,
    dpFilter,
    symLayerName,
    connectorId,
    dpSql,
    dpId,
    layerTitle
  } = useSelector(state => {
    const dpSql = state?.app?.data?.queryData?.dpSql;
    const {
      currentLayerTitle,
      data
    } = state?.app?.data?.queryPanelSymlayersData;
    const currentLayer = data?.find(i => i.queryTitle === currentLayerTitle);

    return {
      dpObjects: currentLayer?.objects || [],
      dpFilter: currentLayer?.filters || null,
      symLayerName: currentLayer?.symLayerName || null,
      connectorId: currentLayer?.connector_id || null,
      dpId: currentLayer?.dpId || null,
      dpSql: dpSql || null,
      layerTitle: currentLayerTitle || EMPTY_STRING
    };
  });

  const confirmModalOpened = useSelector(
    state => state.app.ui.confirmModalVisible
  );

  const handleClose = () => {
    return isChanged
      ? dispatch(setConfirmModal(true))
      : dispatch(setQueryPanelModal(false));
  };

  const handleObjFilEdit = (objs, fils) => {
    setObjects(objs);
    setFilters(fils);
  };

  const handleQueryExecute = () => {
    dispatch(
      getResultFromQuery({
        // TODO: id заменить на connectorId
        id: 'TA',
        // id: connectorId,
        dataType: 'Query',
        // catalog,
        // schema,
        // objectName,: 'Query'
        // fieldName,
        query: dpSql,
        // isDistinct,
        maxRows: 100
      })
    );
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

  const onSelectSemanticLayer = symLayer => {
    dispatch(getQueryPanelSymanticLayerData(symLayer.id));
    setSemanticLayerModalOpened(false);
    setIsChanged(true);
  };

  const handleQueryText = text => {
    setQueryText(text);
  };

  const onClose = () => {
    dispatch(setQueryPanelModal(false));
    dispatch(setConfirmModal(false));
    dispatch(setSymanticLayerData(null));
  };

  const getFilterOperator = filterName => {
    const filterType = FILTER_TYPES_ARR.find(item => item.text === filterName);
    return filterType.value;
  };

  const createQueryText = () => {
    if (objects) {
      dispatch(
        createQuery({
          // TODO: правильный dpUniverse_id
          dpUniverse_id: 10870,
          dpSpec: {
            queryType: 'Query',
            querySetType: null,
            queries: [],
            select: objects.map(object => ({
              id: object.id,
              folder_id: object.parent_id,
              parentDimension_id: null,
              name: object.name,
              folderName: symLayerName,
              parentDimensionName: null,
              dataType: object.dataType,
              objectType: object.objectType
            })),
            // TODO: хардкод одного фильтра
            filter: dpFilter
              ? {
                  type: 'filter',
                  filterTarget: {
                    id: dpFilter.fieldItem.id,
                    dataType: dpFilter.fieldItem.dataType
                  },
                  filterOperator: getFilterOperator(dpFilter.itemCondition),
                  filterOperand1: {
                    type: 'const',
                    valueConst: dpFilter.inputValue
                  }
                }
              : {}
          },
          dpProperties: {
            maxRows: -1,
            maxTime_sec: -1,
            lastConetxt_id: -1,
            keepLastContext: 0
          },
          context_id: -1
        })
      );
    }
  };

  useEffect(() => {
    const resultConditions = filters ? getCondition([filters]) : {};
    if (resultConditions === 'Empty Value') {
      dispatch(
        showToast(TOAST_TYPE.DANGER, 'Не задано значение одного из фильтров')
      );
      setError(' ');
    } else if (isSqlPopupOpened) {
      setError(EMPTY_STRING);
      createQueryText();
    } else {
      setQueryText(EMPTY_STRING);
    }
  }, [isSqlPopupOpened]);

  const handleApply = () => {
    dispatch(
      postQueryPanelTab({
        dp_id: dpId,
        dp: {
          dpConnect_id: 'TA',
          dpName: layerTitle,
          dpObjects: dpObjects.map(i => ({
            dataType: i.dataType,
            id: `${i.id}`,
            name: i.name,
            type: i.objectType
          })),
          dpProperties: {},
          dpSql,
          dpType: 'directSql',
          dp_id: dpId,
          dpSpec: {
            filter: dpFilter
              ? {
                  type: 'filter',
                  filterTarget: {
                    id: dpFilter.fieldItem.id,
                    dataType: dpFilter.fieldItem.dataType
                  },
                  filterOperator: getFilterOperator(dpFilter.itemCondition),
                  filterOperand1: {
                    type: 'const',
                    valueConst: dpFilter.inputValue
                  }
                }
              : {}
          }
        }
      })
    );
    handleClose();
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <DragNDropProvider>
          <div className={styles.content}>
            <div className={styles.leftPanel}>
              <ObjectsPanel modalOpenHandler={handleShowSelector} />
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
              <span style={{ color: 'red' }}>{errorText}</span>
              <QueryPanelControls
                onRun={handleQueryExecute}
                onSql={handleShowSqlPopup}
                onApply={handleApply} // todo применить функционал переноса в отчет
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
            style={{ top: 1 }}
            onReturn={() => dispatch(setConfirmModal(false))}
            onClose={() => onClose()}
          />
        )}
        {isSqlPopupOpened && !errorText.length && (
          <SqlPopup onClose={handleShowSqlPopup} queryText={queryText} />
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
