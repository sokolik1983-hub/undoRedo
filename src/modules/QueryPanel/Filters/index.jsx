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
    handleDropFilter
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
        items={filtersDesk.children}
        condition={filtersDesk.condition}
        draggable
        onDragStart={e =>
          handleDragStart(e, filtersDesk, DRAG_PARENT_SECTION.FILTERS)
        }
        onDragOver={handleDragOver}
      />
    ) : (
      <FiltersDeskItem
        type={filtersDesk.children[0].fieldItem.objectType_id}
        draggable
        onDragOver={handleDragOver}
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
        onDrop={handleDropFilter}
      >
        {renderFiltersDesk()}
      </div>
    </div>
  );
};

export default Filters;
