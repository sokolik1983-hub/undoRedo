import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as Group } from '../../../../layout/assets/queryPanel/group.svg';
import { ReactComponent as ArrowDown } from '../../../../layout/assets/queryPanel/arrowBoldDown.svg';
import { ReactComponent as ArrowUp } from '../../../../layout/assets/queryPanel/arrowBoldUp.svg';
import { ReactComponent as Basket } from '../../../../layout/assets/queryPanel/basket.svg';
import { useDragNDrop } from '../../context/DragNDropContex';
import Tooltip from '../../../../common/components/Tooltip';
import styles from './FiltersHeader.module.scss';

const FiltersHeader = () => {
  const {
    addNode,
    handleMoveUp,
    handleMoveDown,
    onClearFilters
  } = useDragNDrop();

  return (
    <div className={styles.root}>
      <div className={styles.title}>Фильтры запроса</div>
      <div className={styles.btnGroup}>
        <Tooltip placement="topLeft" overlay={<div>Создать новую группу</div>}>
          <IconButton
            className={styles.iconBtn}
            icon={<Group />}
            onClick={addNode}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay={<div>Переместить вверх</div>}>
          <IconButton
            className={styles.iconBtn}
            icon={<ArrowUp />}
            onClick={handleMoveUp}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay={<div>Переместить вниз</div>}>
          <IconButton
            tabIndex="-1"
            className={styles.iconBtn}
            icon={<ArrowDown />}
            onClick={handleMoveDown}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay={<div>Очистить всё</div>}>
          <IconButton
            className={styles.iconBtn}
            icon={<Basket />}
            onClick={onClearFilters}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default FiltersHeader;
