import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../../../../common/components/Button';
import {
  BUTTON,
  DRAG_PARENT_SECTION
} from '../../../../common/constants/common';
import { useDragNDrop } from '../../context/DragNDropContex';
import FiltersDeskItem from '../FiltersDeskItem/FiltersDeskItem';
import styles from './FiltersDeskNode.module.scss';

const FiltersDeskNode = ({
  items,
  condition,
  draggable,
  onDragStart,
  onConditionBlockDrop,
  onItemsBlockDrop,
  onConditionBlockClick
}) => {
  const {
    handleDragStart,
    handleDragOver,
    handleDropFiltersItem,
    handleDropOnFiltersNodeItemsBlock,
    deleteFiltersDeskItem,
    setFocused,
    current
  } = useDragNDrop();

  const [conditionBlockActive, setConditionBlockActive] = useState(false);
  const [itemsBlockActive, setItemsBlockActive] = useState(false);

  const conditionBlock = clsx(styles.conditionBlock, {
    [styles.dndActive]: conditionBlockActive
  });

  const itemsBlock = clsx(styles.itemsBlock, {
    [styles.dndActive]: itemsBlockActive
  });

  const render = item =>
    item.type === 'filter-item' ? (
      <FiltersDeskItem
        ref={current}
        key={item.id}
        type={item.fieldItem.objectType_id}
        title={item.fieldItem.field}
        onItemClick={() => setFocused(item)}
        onDeleteItem={() => deleteFiltersDeskItem(item.id)}
        draggable
        onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.FILTERS)}
        onDragOver={handleDragOver}
        onDrop={e => handleDropFiltersItem(e, item)}
      />
    ) : (
      <FiltersDeskNode
        key={item.id}
        items={item.children}
        condition={item.condition}
        onConditionBlockClick={() => setFocused(item)}
        draggable
        onDragStart={e => handleDragStart(e, item, DRAG_PARENT_SECTION.FILTERS)}
        onConditionBlockDrop={e => handleDropFiltersItem(e, item)}
        onItemsBlockDrop={e => {
          handleDropOnFiltersNodeItemsBlock(e, item);
          setItemsBlockActive(false);
        }}
      />
    );

  return (
    <div
      className={styles.root}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div
        className={conditionBlock}
        onClick={onConditionBlockClick}
        onDragEnter={() => setConditionBlockActive(true)}
        onDragLeave={() => setConditionBlockActive(false)}
        onDrop={e => {
          onConditionBlockDrop(e);
          setConditionBlockActive(false);
        }}
      >
        <Button buttonStyle={BUTTON.SMALL_ORANGE} onClick={() => {}}>
          {condition}
        </Button>
      </div>
      <div
        className={itemsBlock}
        onDragEnter={() => setItemsBlockActive(true)}
        onDragLeave={() => setItemsBlockActive(false)}
        onDrop={e => {
          onItemsBlockDrop(e);
          setItemsBlockActive(false);
        }}
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
  onConditionBlockClick: PropTypes.func
};
