import PropTypes from 'prop-types';
import { ReactComponent as Filter } from '../../../../layout/assets/queryPanel/filter.svg';
import { ReactComponent as Lists } from '../../../../layout/assets/queryPanel/lists.svg';
import { ReactComponent as Basket } from '../../../../layout/assets/queryPanel/basket.svg';
import IconButton from '../../../../common/components/IconButton';
import Tooltip from '../../../../common/components/NewTooltip/Tooltip';
import styles from './ObjectsHeader.module.scss';

const ObjectsHeader = ({ clearObjectsDesk }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Объекты отчета</div>
      <div className={styles.btnGroup}>
        <Tooltip text="Фильтр" space={5}>
          <IconButton
            className={styles.iconBtn}
            icon={<Filter />}
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip text="Списки" space={5}>
          <IconButton
            className={styles.iconBtn}
            icon={<Lists />}
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip text="очистить всё" space={5}>
          <IconButton
            className={styles.iconBtn}
            icon={<Basket />}
            onClick={() => clearObjectsDesk()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ObjectsHeader;

ObjectsHeader.propTypes = {
  clearObjectsDesk: PropTypes.func
};
