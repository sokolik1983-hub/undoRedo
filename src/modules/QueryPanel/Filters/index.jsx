/* eslint-disable react/jsx-curly-newline */
import Divider from '../../../common/components/Divider';
import FiltersHeader from './FiltersHeader/FiltersHeader';
import { useDragNDrop } from '../context/DragNDropContex';
import FiltersDeskItem from './FiltersDeskItem/FiltersDeskItem';
import FiltersDeskNode from './FiltersDeskNode/FiltersDeskNode';
import { DRAG_PARENT_SECTION } from '../../../common/constants/common';
import styles from './Filters.module.scss';

const Filters = () => {
  const {
    filtersDesk,
    handleDragStart,
    handleDragOver,
    handleDropOnFiltersArea,
    handleDropOnFiltersItem,
    handleDropOnFiltersNodeItemsBlock,
    deleteFiltersDeskItem,
    setFocused
  } = useDragNDrop();

  const renderFiltersDesk = () => {
    if (!filtersDesk)
      return (
        <div>
          Для фильтрации отчета выберите предъопределенные фильтры или объекты
          на панели и перетащите их сюда
        </div>
      );

    return filtersDesk.type === 'filter-node' ? (
      <FiltersDeskNode
        id={filtersDesk.id}
        items={filtersDesk.children}
        condition={filtersDesk.condition}
        onConditionBlockClick={() => setFocused(filtersDesk)}
        draggable
        onDragStart={e =>
          handleDragStart(e, filtersDesk, DRAG_PARENT_SECTION.FILTERS)
        }
        onDragOver={handleDragOver}
        onConditionBlockDrop={e => handleDropOnFiltersItem(e, filtersDesk)}
        onItemsBlockDrop={e =>
          handleDropOnFiltersNodeItemsBlock(e, filtersDesk)
        }
      />
    ) : (
      <FiltersDeskItem
        id={filtersDesk.id}
        title={filtersDesk.fieldItem.field}
        type={filtersDesk.fieldItem.objectType_id}
        onItemClick={() => setFocused(filtersDesk)}
        onDeleteItem={() => deleteFiltersDeskItem(filtersDesk.id)}
        draggable
        onDragStart={e =>
          handleDragStart(e, filtersDesk, DRAG_PARENT_SECTION.FILTERS)
        }
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      <Divider color="#FFFFFF" />
      <FiltersHeader />
      <div
        id="filters-block"
        className={styles.filtersBlock}
        onDragOver={handleDragOver}
        onDrop={handleDropOnFiltersArea}
      >
        {renderFiltersDesk()}
      </div>
    </div>
  );
};

export default Filters;
