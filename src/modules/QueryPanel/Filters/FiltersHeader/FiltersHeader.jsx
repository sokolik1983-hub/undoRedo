import IconButton from '../../../../common/components/IconButton';
import Tooltip from '../../../../common/components/Tooltip';
import ArrowDown from '../../../../layout/assets/queryPanel/arrowBoldDown.svg';
import ArrowUp from '../../../../layout/assets/queryPanel/arrowBoldUp.svg';
import Basket from '../../../../layout/assets/queryPanel/basket.svg';
import Group from '../../../../layout/assets/queryPanel/group.svg';
import { useDragNDrop } from '../../context/DragNDropContext';
import styles from './FiltersHeader.module.scss';

const FiltersHeader = () => {
  const { addNode, handleMoveUp, handleMoveDown, onClearFilters } =
    useDragNDrop();

  return (
    <div className={styles.root}>
      <div className={styles.title}>Фильтры запроса</div>
      <div className={styles.btnGroup}>
        <Tooltip placement="topLeft" overlay="Создать новую группу">
          <IconButton
            className={styles.iconBtn}
            icon={<Group />}
            onClick={addNode}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay="Переместить вверх">
          <IconButton
            className={styles.iconBtn}
            icon={<ArrowUp />}
            onClick={handleMoveUp}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay="Переместить вниз">
          <IconButton
            tabIndex="-1"
            className={styles.iconBtn}
            icon={<ArrowDown />}
            onClick={handleMoveDown}
          />
        </Tooltip>
        <Tooltip placement="topLeft" overlay="Очистить всё">
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
