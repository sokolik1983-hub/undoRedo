import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../../../../common/components/Button';
import {
  BUTTON,
  DRAG_PARENT_SECTION
} from '../../../../common/constants/common';
import { useDragNDrop } from '../../context/DragNDropContext'; 
import FiltersDeskItem from '../FiltersDeskItem/FiltersDeskItem';
import styles from './FiltersDeskNode.module.scss';

const FiltersDeskNode = ({
  items,
  condition,
  draggable,
  onDragStart,
  onConditionBlockDrop,
  onItemsBlockDrop,
  onConditionBlockClick,
  id
}) => {
  const {
    handleDragStart,
    handleDragOver,
    handleDropOnFiltersItem,
    handleDropOnFiltersNodeItemsBlock,
    deleteFiltersDeskItem,
    focused,
    setFocused
  } = useDragNDrop();

  const [conditionBlockActive, setConditionBlockActive] = useState(false);
  const [itemsBlockActive, setItemsBlockActive] = useState(false);

  const root = clsx(styles.root, {
    [styles.selected]: focused?.id === id
  });

  const conditionBlock = clsx(styles.conditionBlock, {
    [styles.dndActive]: conditionBlockActive
  });

  const itemsBlock = clsx(styles.itemsBlock, {
    [styles.dndActive]: itemsBlockActive
  });

  const handleDragEnterOnConditionBlock = e => {
    e.stopPropagation();
    setConditionBlockActive(true);
  };

  const handleDragEnterOnItemsBlock = e => {
    e.stopPropagation();
    setItemsBlockActive(true);
  };

  const handeDropOnConditionBlock = e => {
    onConditionBlockDrop(e);
    setConditionBlockActive(false);
  };

  const handleDropOnItemsBlock = e => {
    onItemsBlockDrop(e);
    setItemsBlockActive(false);
  };

  const render = item =>
    item.type === 'filter-item' ? (
      <FiltersDeskItem
        key={item.id}
        id={item.id}
        type={item.fieldItem.objectType_id}
        title={item.fieldItem.field}
        onItemClick={() => setFocused(item)}
        onDeleteItem={() => deleteFiltersDeskItem(item.id)}
        draggable
        onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.FILTERS)}
        onDragOver={handleDragOver}
        onDrop={e => handleDropOnFiltersItem(e, item)}
      />
    ) : (
      <FiltersDeskNode
        key={item.id}
        id={item.id}
        items={item.children}
        condition={item.condition}
        onConditionBlockClick={() => setFocused(item)}
        draggable
        onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.FILTERS)}
        onConditionBlockDrop={e => handleDropOnFiltersItem(e, item)}
        onItemsBlockDrop={e => handleDropOnFiltersNodeItemsBlock(e, item)}
      />
    );

  return (
    <div className={root} draggable={draggable} onDragStart={onDragStart}>
      <div
        className={conditionBlock}
        onClick={onConditionBlockClick}
        onDragEnter={handleDragEnterOnConditionBlock}
        onDragLeave={() => setConditionBlockActive(false)}
        onDrop={handeDropOnConditionBlock}
      >
        <Button buttonStyle={BUTTON.SMALL_ORANGE} onClick={() => {}}>
          {condition}
        </Button>
      </div>
      <div
        className={itemsBlock}
        onDragEnter={handleDragEnterOnItemsBlock}
        onDragLeave={() => setItemsBlockActive(false)}
        onDragEnd={() => setItemsBlockActive(false)}
        onDrop={handleDropOnItemsBlock}
      >
        {items.map(item => render(item))}
      </div>
    </div>
  );
};

export default FiltersDeskNode;

FiltersDeskNode.propTypes = {
  items: PropTypes.array,
  condition: PropTypes.string,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onConditionBlockDrop: PropTypes.func,
  onItemsBlockDrop: PropTypes.func,
  onConditionBlockClick: PropTypes.func,
  id: PropTypes.number
};
