/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import lodash from 'lodash';
import { Folder, FolderOpen } from '@material-ui/icons';
import styles from './TreeView.module.scss';
import { deepFind } from '../../helpers/common';

const TreeView = ({ data = [], onSelect, onRefresh }) => {
  // eslint-disable-next-line prefer-const
  let clonedData = lodash.cloneDeep(data);

  function handleDropObject(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    const targetEl = event.target;
    const targetFolder = deepFind({ array: clonedData, value: targetEl.id });
    const removeFromFolder = deepFind({
      array: clonedData,
      value: selectedEl.parent_id
    });
    // eslint-disable-next-line no-debugger
    debugger;
    if (targetFolder && targetFolder.isFolder) {
      targetFolder.children.push({ ...selectedEl, parent_id: targetFolder.id });
    }
    if (removeFromFolder && removeFromFolder.children) {
      removeFromFolder.children = removeFromFolder.children.filter(
        item => item.id !== selectedEl.id
      );
    }
    if (!selectedEl.parent_id) {
      clonedData = clonedData.filter(item => item.id !== selectedEl.id);
    }

    onRefresh(clonedData);
  }

  return (
    <div className={styles['root']}>
      <ul className={styles['container']}>
        {clonedData?.map(tree => (
          <TreeNode
            key={tree.id}
            node={tree}
            onSelect={onSelect}
            onDrop={handleDropObject}
            onRefresh={onRefresh}
          />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node, onSelect, onDrop, onRefresh }) => {
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = !!node.children;

  function allowDrop(event) {
    event.preventDefault();
  }

  return (
    <li className={styles['node']}>
      <div
        onClick={() => {
          onSelect(node);
          setChildVisibility(state => !state);
        }}
        draggable="true"
        onDragStart={event => {
          event.dataTransfer.setData('text/plain', JSON.stringify(node));
        }}
        onDrop={onDrop}
        onDragOver={allowDrop}
      >
        <div className={styles['head']}>
          {hasChild && (
            <div className={styles['toggler']}>
              {childVisible ? (
                <FolderOpen className={styles['node-icon']} />
              ) : (
                <Folder className={styles['node-icon']} />
              )}
            </div>
          )}
          {!hasChild &&
            (node?.icon ? (
              node.icon
            ) : (
              <InsertDriveFileIcon className={styles['node-icon']} />
            ))}
          <span id={node.id}>{node.label}</span>
          {node.actions && (
            <div className={styles['node-actions']}>{node.actions}</div>
          )}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className={styles['content']}>
          <ul className={styles['container']}>
            <TreeView
              data={node.children}
              onSelect={onSelect}
              onRefresh={onRefresh}
            />
          </ul>
        </div>
      )}
    </li>
  );
};

TreeView.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  onRefresh: PropTypes.func
};

TreeNode.propTypes = {
  node: PropTypes.object,
  onSelect: PropTypes.func,
  onDrop: PropTypes.func,
  onRefresh: PropTypes.func
};

export default TreeView;
