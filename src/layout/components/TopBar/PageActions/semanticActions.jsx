/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SEMANTIC_PAGE_ACTIONS } from '../../../../common/constants/common';
import styles from './PageActions.module.scss';
import { setObjectsConnectionsModal } from '../../../../data/actions/universes';
import {
  setIsShowingContexts,
  setIsShowingLinks,
  setColoredValue
} from '../../../../data/reducers/schemaDesigner';
import TextInput from '../../../../common/components/TextInput';

const SemanticActions = () => {
  const dispatch = useDispatch();

  const coloredValue = useSelector(
    state => state.app.schemaDesigner.coloredValue
  );

  const [isFilter, setIsFilter] = useState(false);

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
        return setIsFilter(!isFilter)
      default:
        return null;
    }
  };

  const location = useLocation();

  const filterIcons = (arr) => { 
    if (!location.pathname.endsWith('create')) {
      return arr.map(item => item.action !== 'commonSearch' ? {...item, enable: false} : item)
                .filter(item => item.type !== 'divider')
    };
    return arr;
  };

  const newArr = filterIcons(SEMANTIC_PAGE_ACTIONS);

  return (
    <div className={styles.actionsContainer}>
      {newArr.map(item => {
        return (
          <div
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
      {isFilter && <TextInput value={coloredValue} onChange={(event) => dispatch(setColoredValue(event.target.value))} className={styles.filterInput} />}
    </div>
  );
};

export default SemanticActions;

