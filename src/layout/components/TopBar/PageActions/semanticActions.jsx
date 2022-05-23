/* eslint-disable no-nested-ternary */
import { useDispatch } from 'react-redux';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEMANTIC_PAGE_ACTIONS } from '../../../../common/constants/common';
import styles from './PageActions.module.scss';
import { setObjectsConnectionsModal } from '../../../../data/actions/universes';
import {
  setIsShowingContexts,
  setIsShowingLinks
} from '../../../../data/reducers/schemaDesigner';

const SemanticActions = () => {
  const dispatch = useDispatch();

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
    </div>
  );
};

export default SemanticActions;
