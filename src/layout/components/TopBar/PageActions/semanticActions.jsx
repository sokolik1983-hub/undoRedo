import { useDispatch } from 'react-redux';
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
  return (
    <div className={styles.actionsContainer}>
      {SEMANTIC_PAGE_ACTIONS.map(item => {
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
    </div>
  );
};

export default SemanticActions;
