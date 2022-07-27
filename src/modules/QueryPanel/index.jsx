import PropTypes from 'prop-types';
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../common/components/Modal';
import { EMPTY_STRING, TOAST_TYPE } from '../../common/constants/common';
import { showToast } from '../../data/actions/app';
import { setQueryPanelModal } from '../../data/actions/universes';
import {
  createQuery,
  createQueryAndGetResult,
  createQueryAndPostQueryPanelTab,
  getQueryPanelSymanticLayerData,
} from '../../data/reportDesigner/queryPanelData/queryPanelDataActions';
import modalStyles from '../Symlayers/SemanticLayerModal/SemanticLayerModal.module.scss';
import DragNDropProvider from './context/DragNDropContext';
import Filters from './Filters';
import { FILTER_TYPES_ARR } from './Filters/FiltersDeskItem/constants';
import { getCondition } from './helper';
import Objects from './Objects';
import ObjectsPanel from './ObjectsPanel';
import styles from './QueryPanel.module.scss';
import QueryPanelControls from './QueryPanelControls/QueryPanelControls';
import Results from './Results';
import SelectSemanticLayer from './SelectSemanticLayer';
import SqlPopup from './SqlPopup';

const QueryPanel = ({ visible }) => {
  const dispatch = useDispatch();
  const [semanticLayerModalOpened, setSemanticLayerModalOpened] =
    useState(false);
  const [isQueryExecute, setQueryExecute] = useState(false);
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
    dpId,
    layerTitle,
    universeId,
  } = useSelector((state) => {
    const { currentLayerTitle, data } =
      state?.app?.reportDesigner?.queryPanelData;
    const currentLayer = data?.find((i) => i.queryTitle === currentLayerTitle);

    return {
      dpObjects: currentLayer?.objects || [],
      dpFilter: currentLayer?.filters || null,
      symLayerName: currentLayer?.symLayerName || null,
      connectorId: currentLayer?.connector_id || null,
      dpId: currentLayer?.dpId || null,
      layerTitle: currentLayerTitle || EMPTY_STRING,
      universeId: currentLayer?.universeId || null,
    };
  });

  const handleClose = () => {
    dispatch(setQueryPanelModal(false));
  };

  const handleObjFilEdit = (objs, fils) => {
    setObjects(objs);
    setFilters(fils);
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

  const onSelectSemanticLayer = (symLayer) => {
    dispatch(getQueryPanelSymanticLayerData(symLayer.id));
    setSemanticLayerModalOpened(false);
  };

  const handleQueryText = (text) => {
    setQueryText(text);
  };

  const getFilterOperator = (filterName) => {
    const filterType = FILTER_TYPES_ARR.find(
      (item) => item.text === filterName,
    );
    return filterType.value;
  };

  const createQueryParams = {
    dpUniverse_id: universeId,
    dpSpec: {
      queryType: 'Query',
      querySetType: null,
      queries: [],
      select: objects.map((object) => ({
        id: object.id,
        folder_id: object.parent_id,
        parentDimension_id: null,
        name: object.name,
        folderName: symLayerName,
        parentDimensionName: null,
        dataType: object.dataType,
        objectType: object.objectType,
      })),
      // TODO: хардкод одного фильтра
      filter: dpFilter
        ? {
            type: 'filter',
            filterTarget: {
              id: dpFilter.fieldItem.id,
              dataType: dpFilter.fieldItem.dataType,
            },
            filterOperator: getFilterOperator(dpFilter.itemCondition),
            filterOperand1: {
              type: 'const',
              valueConst: dpFilter.inputValue,
            },
          }
        : {},
    },
    dpProperties: {
      maxRows: -1,
      maxTime_sec: -1,
      lastConetxt_id: -1,
      keepLastContext: 0,
    },
    context_id: -1,
  };

  const createQueryText = () => {
    if (objects) {
      dispatch(createQuery(createQueryParams));
    }
  };

  useEffect(() => {
    const resultConditions = filters ? getCondition([filters]) : {};
    if (resultConditions === 'Empty Value') {
      dispatch(
        showToast(TOAST_TYPE.DANGER, 'Не задано значение одного из фильтров'),
      );
      setError(' ');
    } else if (isSqlPopupOpened) {
      setError(EMPTY_STRING);
      createQueryText();
    } else {
      setQueryText(EMPTY_STRING);
    }
  }, [isSqlPopupOpened]);

  const handleQueryExecute = () => {
    dispatch(
      createQueryAndGetResult(createQueryParams, {
        id: connectorId,
        dataType: 'Query',
        // catalog,
        // schema,
        // objectName,: 'Query'
        // fieldName,
        // query: dpSql,
        // isDistinct,
        maxRows: 100,
      }),
    );
  };

  const handleApply = () => {
    dispatch(
      createQueryAndPostQueryPanelTab(createQueryParams, {
        dp_id: dpId,
        dp: {
          dpConnect_id: 'TA',
          dpName: layerTitle,
          dpObjects: dpObjects.map((i) => ({
            dataType: i.dataType,
            id: `${i.id}`,
            name: i.name,
            type: i.objectType,
          })),
          dpProperties: {},
          // dpSql,
          dpType: 'directSql',
          dp_id: dpId,
          dpSpec: {
            filter: dpFilter
              ? {
                  type: 'filter',
                  filterTarget: {
                    id: dpFilter.fieldItem.id,
                    dataType: dpFilter.fieldItem.dataType,
                  },
                  filterOperator: getFilterOperator(dpFilter.itemCondition),
                  filterOperand1: {
                    type: 'const',
                    valueConst: dpFilter.inputValue,
                  },
                }
              : {},
          },
        },
      }),
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
                onClose={handleClose}
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
  visible: PropTypes.bool.isRequired,
};
