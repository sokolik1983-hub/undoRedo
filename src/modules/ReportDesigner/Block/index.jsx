import clsx from 'clsx';
import React from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import styles from './Block.module.scss';

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
  function renderContent() {
    switch (type) {
      case 'table':
        return (
          <table style={{ ...blockProps.styles }}>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>name</td>
              </tr>
              <tr>
                <td>id</td>
                <td>name</td>
              </tr>
              <tr>
                <td>id</td>
                <td>name</td>
              </tr>
            </tbody>
          </table>
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
