/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SEMANTIC_PAGE_ACTIONS } from '../../../../common/constants/common';
import styles from './PageActions.module.scss';
import CreateObjectLayerModal from '../../../../modules/SymlayersDesigner/CreateObjectLayerModal/index';
import { createUniverse, setObjectsConnectionsModal } from '../../../../data/actions/universes';
import {
  setIsShowingContexts,
  setIsShowingLinks
} from '../../../../data/reducers/schemaDesigner';
import EditObjectLayerModal from '../../../../modules/SymlayersDesigner/Sidebar/EditObjectLayerModal';
import Button from '../../../../common/components/Button';



// import TextInput from '../../../../common/components/TextInput';

const SemanticActions = () => {
  const dispatch = useDispatch();
  // const [universe, setUniverse] = useState({});
  const [formattedObjectLayer, setFormattedObjects] = useState([]);

  // const coloredValue = useSelector(
  //   state => state.app.schemaDesigner.coloredValue
  // );

  // const [isFilter, setIsFilter] = useState(false);

  const getAction = action => {
    switch (action) {
      case 'defineConnections':
        return dispatch(setObjectsConnectionsModal(true));
      case 'addConnection':
        return dispatch(setObjectsConnectionsModal(true));
      case 'contextPanel':
        return dispatch(setIsShowingContexts());
      case 'connectionsPanel':
        return dispatch(setIsShowingLinks());
      case 'commonSearch':
        return null
      default:
        return null;
    }
  };

  const location = useLocation();

  const filterIcons = arr => {
    if (!location.pathname.endsWith('create')) {
      return arr
        .map(item =>
          item.action !== 'commonSearch' ? { ...item, enable: false } : item
        )
        .filter(item => item.type !== 'divider');
    }
    return arr;
  };

  const newArr = filterIcons(SEMANTIC_PAGE_ACTIONS);

  /* удалить когда перенесем кнопку открытия Создать  */
  const isCreateObjectModalOpened = useSelector(
    state => state.app.ui.modalCreateObjectVisible
  );
  /* удалить когда перенесем кнопку открытия Создать  */
  /* удалить когда перенесем кнопку открытия Создать  */
  const isEditObjectModalOpened = useSelector(
    state => state.app.ui.modalEditObjectVisible
  );
  /* удалить когда перенесем кнопку открытия Создать  */

  const links = useSelector(
    state => state.app.schemaDesigner.links
  );  
  
  const objectsLayers = useSelector(
    state => state.app.schemaDesigner.objectsLayerList
  );  
  
  const selectedTablesData = useSelector(
    state => state.app.schemaDesigner.selectedTablesData
  );  

  const currentUniverse = useSelector(
    state => state.app.data.currentUniverse
  );

  const translitNames = word => {
    switch (word) {
      case 'Символ':
        return 'Symbol';
      case 'Дата':
        return 'Datetime';
      case 'Номер':
        return 'Number';
      case 'Текст':
        return 'String';
      case 'Показатель':
        return 'Measure';
      case 'Измерение':
        return 'Dimension';
      case 'Атрибут':
        return 'Attribute'
      default:
        return null;
    }
  };
  

  useEffect(() => {
    let objects = [...objectsLayers];
    objects = objects.map(object => {
      const tempObj = {...object}
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
      tempObj.tables = [1];
      tempObj.parent_id = 0;
      tempObj.mask = null;

      return tempObj;
    });
    setFormattedObjects(objects);
  }, [objectsLayers]);

  const saveUniverse = () => {
    console.log(links, formattedObjectLayer, selectedTablesData);
    const universe = JSON.parse(JSON.stringify(currentUniverse));
    universe.data.tables = selectedTablesData;
    universe.data.links = links;
    universe.data.objects = formattedObjectLayer;
    dispatch(createUniverse(universe));
  }

  return (
    <div className={styles.actionsContainer}>
      {newArr.map(item => {
        return (
          <div
            key={item.title}
            className={
              item.type === 'divider' ? styles.divider : styles.actionWrapper
            }
            title={item.title || ''}
            onClick={() => item.enable && getAction(item.action)}
          >
            {item.enable ? item.icon : item.disIcon}
            <span className={item.enable ? null : styles.deactivated}>
              {item.text || ''}
            </span>
          </div>
        );
      })}
      {<Button style={{color: 'black', marginLeft: '5px'}} onClick={saveUniverse}>Сохранить юниверс</Button>}
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

