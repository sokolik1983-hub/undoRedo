import clsx from 'clsx';
import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Block.module.scss';
import { setSelectedColumns } from '../../../data/reducers/reportDesigner';
import DataTable from './DataTable';

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

  // useEffect(() => {
  //   const { width, height } = refContent?.current?.getBoundingClientRect();
  //   if (scales.width !== width || scales.height !== height) {
  //     onChangeScales(id, {
  //       width,
  //       height
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const {
  //     width,
  //     height,
  //     // x,
  //     // y
  //   } = refContent?.current?.getBoundingClientRect();
  //   if (scales.width !== width || scales.height !== height) {
  //     onChangeScales(id, {
  //       width,
  //       height,
  //       // x,
  //       // y: position.y < 103 ? position.y : y - 103
  //     });
  //   }
  // }, [refContent, scales]);

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
      case 'table':
        return (
          <DataTable
            blockStyles={blockProps.styles}
            structureItem={structureItem}
            onSelectColumnHead={handleSelectColumn}
            id={id}
            refContent={refContent}
          />
        );
      case 'graph':
        return <div style={{ ...blockProps.styles }}>Graphoc</div>;
      default:
        return null;
    }
  }

  return (
    <Rnd
      enableUserSelectHack
      bounds="parent"
      className={clsx(styles.root, styles[type], {
        [styles['is_active']]: isActiveNode
      })}
      enableResizing
      size={{ ...scales }}
      position={{ ...position }}
      onClick={e => {
        e.stopPropagation();
      }}
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