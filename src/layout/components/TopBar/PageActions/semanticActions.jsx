import { SEMANTIC_PAGE_ACTIONS } from '../../../../common/constants/common';
import styles from './PageActions.module.scss';

const SemanticActions = () => {
  return(
    <div className={styles.actionsContainer}>
      {SEMANTIC_PAGE_ACTIONS.map(item => {
        return (
          <div
            className={item.type === 'divider' ? styles.divider : styles.actionWrapper}
            title={item.title || ''}
          >
            {item.icon}
            <span>
              {item.text || ''}
            </span>
          </div>
        )
      })}
    </div>
  )
};

export default SemanticActions;
