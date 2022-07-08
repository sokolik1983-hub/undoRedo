import clsx from 'clsx';
import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Block.module.scss';
import DataTable from './DataTable';
import Cell from './Cell';
import { setSelectedColumns } from '../../../data/reducers/new_reportDesigner';

function Block({
  id,
  position,
  scales,
  structureItem,
  type,
  onChangePosition,
  onChangeScales,
  onSelect,
  isActiveNode,
  ...blockProps
}) {
  const refContent = useRef();
  const dispatch = useDispatch();
  const reportsUi = useSelector(state => state.app.reportDesigner.reportsUi.ui);
 
  const handleSelectColumn = columnId => event => {
    event.stopPropagation();
    if (isActiveNode) {
      if (reportsUi.selectedColumns) {
        if (reportsUi.selectedColumns[id]?.includes(columnId)) {
          dispatch(
            setSelectedColumns({
              [id]: [
                ...reportsUi.selectedColumns[id].filter(
                  item => item !== columnId
                )
              ]
            })
          );
        } else {
          dispatch(
            setSelectedColumns({
              [id]: reportsUi.selectedColumns[id]
                ? [...reportsUi.selectedColumns[id], columnId]
                : [columnId]
            })
          );
        }
      } else {
        dispatch(setSelectedColumns({ [id]: [columnId] }));
      }
    }
  };

  function renderContent() {
    switch (type) {
      case 'vTable':
      case 'xTable':
      case 'hTable':
        return (
          <DataTable
            blockStyles={blockProps.styles}
            // newScales={scales}
            // newPosition={position}
            structureItem={structureItem}
            onSelectColumnHead={handleSelectColumn}
            id={id}
            refContent={refContent}
          />
        );
      case 'graph':
        return <div style={{ ...blockProps.styles }}>Graph component</div>;
      case 'cell':
        return (
          <Cell
            blockStyles={structureItem.style}
            structureItem={structureItem.content}
            id={id}
            refContent={refContent}
            independent
            originalItem={structureItem}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Rnd
      enableUserSelectHack
      // bounds="parent"
      // TODO: закомментировано для Дизайнера отчета, чтобы таблица не прилипала к верхней границе
      //       подумать над альтернативой (баг в либе RnD: если таблица не полностью попадает в видимую область,
      //       координаты для частично не показываемых элементов равны нулю)
      className={clsx(styles.root, styles[type], {
        [styles['is_active']]: isActiveNode
      })}
      enableResizing
      size={{ ...scales }}
      position={{ ...position }}
      // onClick={e => {
      //   e.stopPropagation();
      // }}
      onDoubleClick={e => {
        e.stopPropagation();
        onSelect(structureItem, e.shiftKey);
      }}
      onDragStop={(e, d) => {
        e.stopPropagation();
        onChangePosition(id, {
          x: d.x,
          y: d.y
        });
      }}
      onResizeStop={(e, direction, ref, delta, positions) => {
        e.stopPropagation();
        onChangeScales(id, {
          width: ref.style.width,
          height: ref.style.height,
          ...positions
        });
      }}
    >
      {renderContent()}
    </Rnd>
  );
}

Block.propTypes = {
  id: PropTypes.number,
  position: PropTypes.object,
  scales: PropTypes.object,
  structureItem: PropTypes.object,
  type: PropTypes.string,
  onChangePosition: PropTypes.func,
  onChangeScales: PropTypes.func,
  onSelect: PropTypes.func,
  isActiveNode: PropTypes.bool
};

export default Block;
