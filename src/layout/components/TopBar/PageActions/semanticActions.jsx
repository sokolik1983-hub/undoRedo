import React, { useEffect, useState } from 'react';
/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Tooltip from '@src/common/components/Tooltip';
import { SEMANTIC_PAGE_ACTIONS } from '@src/common/constants/common';
import {
  createUniverse,
  setObjectsConnectionsModal,
} from '@src/data/actions/universes';
import { useAppSelector } from '@src/data/hooks/redux';
import {
  setIsShowingContexts,
  setIsShowingLinks,
  setShowingTabs,
} from '@src/data/reducers/schemaDesigner';

import CreateObjectLayerModal from '../../../../modules/SymlayersDesigner/CreateObjectLayerModal/index';
import EditObjectLayerModal from '../../../../modules/SymlayersDesigner/Sidebar/EditObjectLayerModal';
import translitNames from './helper';
import styles from './PageActions.module.scss';

const SemanticActions = () => {
  const dispatch = useDispatch();
  // const [universe, setUniverse] = useState({});
  const [formattedObjectLayer, setFormattedObjects] = useState([]);
  const [updatedCoordsTables, setUpdatedCoordsTables] = useState([]);

  // const coloredValue = useSelector(
  //   state => state.app.schemaDesigner.coloredValue
  // );

  // const [isFilter, setIsFilter] = useState(false);

  const location = useLocation();

  const filterIcons = (arr) => {
    if (!location.pathname.endsWith('create')) {
      return arr
        .map((item) =>
          item.action !== 'commonSearch' ? { ...item, enable: false } : item,
        )
        .filter((item) => item.type !== 'divider');
    }
    return arr;
  };

  const newArr = filterIcons(SEMANTIC_PAGE_ACTIONS);

  /* удалить когда перенесем кнопку открытия Создать  */
  const isCreateObjectModalOpened = useSelector(
    (state) => state.app.ui.modalCreateObjectVisible,
  );
  /* удалить когда перенесем кнопку открытия Создать  */
  /* удалить когда перенесем кнопку открытия Создать  */
  const isEditObjectModalOpened = useSelector(
    (state) => state.app.ui.modalEditObjectVisible,
  );
  /* удалить когда перенесем кнопку открытия Создать  */

  const { showTabs, showLinks, showContexts } = useAppSelector(
    (state) => state.app.schemaDesigner.ui,
  );

  const links = useSelector((state) => state.app.schemaDesigner.links);

  const objectsLayers = useSelector(
    (state) => state.app.schemaDesigner.objectsLayerList,
  );

  const selectedConnectorId = useSelector(
    (state) => state.app.data.selectedConnectorId,
  );

  const selectedTablesData = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesData,
  );

  const currentUniverse = useSelector(
    (state) => state.app.data.currentUniverse,
  );

  const tablesCoord = useSelector(
    (state) => state.app.schemaDesigner.tablesCoord,
  );

  useEffect(() => {
    let objects = [...objectsLayers];
    objects = objects.map((object) => {
      const tempObj = { ...object };
      delete tempObj.refreshBeforeUsageCheckBox;
      delete tempObj.searchDelegetionCheckBox;
      delete tempObj.showHierarchyCheckBox;
      delete tempObj.thisListEditCheckBox;
      delete tempObj.useInConditionsCheckBox;
      delete tempObj.useInResultsCheckBox;
      delete tempObj.useInSortingsCheckBox;
      delete tempObj.techInfoInput;
      delete tempObj.originInput;
      delete tempObj.defaultLinkInput;
      delete tempObj.displayInput;
      delete tempObj.exportByUniverseCheckBox;
      delete tempObj.keysDataType;
      delete tempObj.keysSelectInput;
      delete tempObj.keysWhereInput;
      delete tempObj.keysType;
      delete tempObj.usagePermission;
      tempObj.dataType = 'Symbol';
      tempObj.aggFunc = 'SUM';
      tempObj.aggFuncName = 'SUM';
      delete tempObj.objectFunction;
      tempObj.description = tempObj.objectDescription;
      delete tempObj.objectDescription;
      tempObj.userDataType = translitNames(tempObj.objectDataType);
      tempObj.objectType = translitNames(tempObj.objectType);
      delete tempObj.objectDataType;
      tempObj.select = tempObj.selectQueryField;
      tempObj.where = tempObj.whereQueryField;
      delete tempObj.selectQueryField;
      delete tempObj.whereQueryField;
      tempObj.tables = tempObj.tables?.length ? tempObj.tables : [0];
      tempObj.parent_id = 0;
      tempObj.mask = null;
      return tempObj;
    });
    setFormattedObjects(objects);
  }, [objectsLayers]);

  useEffect(() => {
    const tables = selectedTablesData.map((table) => {
      const tempTable = JSON.parse(JSON.stringify(table));
      const { schema, objectName } = tempTable;
      const findedIdx = tablesCoord.findIndex(
        (tab) => tab.tableId === `${schema}_${objectName}`,
      );
      tempTable.objectType =
        tempTable.objectType[0].toUpperCase() +
        tempTable.objectType.slice(1).toLowerCase();
      if (findedIdx !== -1) {
        tempTable.position = {
          x: tablesCoord[findedIdx].x,
          y: tablesCoord[findedIdx].y,
        };
      } else if (tablesCoord.length < selectedTablesData.length) {
        tempTable.position = table.position.deltaPosition;
      }
      return tempTable;
    });
    setUpdatedCoordsTables(tables);
  }, [tablesCoord]);

  const saveUniverse = () => {
    const universe = JSON.parse(JSON.stringify(currentUniverse));
    universe.data.tables = updatedCoordsTables.length
      ? updatedCoordsTables
      : selectedTablesData;
    universe.data.links = links;
    universe.data.objects = formattedObjectLayer;
    universe.data.connector_id = selectedConnectorId;
    dispatch(createUniverse(universe, currentUniverse.header.name));
  };

  const getAction = (action) => {
    switch (action) {
      case 'defineConnections':
        return dispatch(setObjectsConnectionsModal(true));
      case 'addConnection':
        return dispatch(setObjectsConnectionsModal(true));
      case 'contextPanel':
        return dispatch(setIsShowingContexts());
      case 'connectionsPanel':
        return dispatch(setIsShowingLinks());
      case 'tabsPanel':
        return dispatch(setShowingTabs());
      case 'commonSearch':
        return null;
      case 'saveSymLayer':
        return saveUniverse();
      default:
        return null;
    }
  };

  const isButtonPressed = (action) => {
    return !!(
      (action === 'contextPanel' && showContexts) ||
      (action === 'connectionsPanel' && showLinks) ||
      (action === 'tabsPanel' && showTabs)
    );
  };

  return (
    <div className={styles.actionsContainer}>
      {newArr.map((item) => {
        return (
          <Tooltip placement={'bottomLeft'} overlay={item.title || ''}>
            <div
              key={item.title}
              className={
                item.type === 'divider' ? styles.divider : styles.actionWrapper
              }
              onClick={() => item.enable && getAction(item.action)}
            >
              <div
                className={
                  isButtonPressed(item.action) ? styles.pressedButton : null
                }
              ></div>
              {item.enable ? item.icon : item.disIcon}
              {item.text ? (
                <span className={item.enable ? null : styles.deactivated}>
                  {item.text || ''}
                </span>
              ) : null}
            </div>
          </Tooltip>
        );
      })}
      {isCreateObjectModalOpened && (
        <CreateObjectLayerModal visible={isCreateObjectModalOpened && true} />
      )}
      {isEditObjectModalOpened && (
        <EditObjectLayerModal visible={isEditObjectModalOpened && true} />
      )}
      {/* {isFilter && <TextInput value={coloredValue} onChange={(event) => dispatch(setColoredValue(event.target.value))} className={styles.filterInput} />} */}
    </div>
  );
};

export default SemanticActions;
