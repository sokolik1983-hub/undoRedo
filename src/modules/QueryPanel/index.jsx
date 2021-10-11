import React, { useState } from 'react';
import TreeView from '../../common/components/TreeView';
import styles from './QueryPanel.module.scss';

const treeData = [
  {
    id: '0',
    label: 'Documents',
    isFolder: true,
    parent_id: null,
    children: [
      {
        id: '0-0',
        parent_id: '0',
        isFolder: true,
        label: 'Document 1-1',
        children: [
          {
            id: '0-1-1',
            parent_id: '0-0',
            isFolder: false,
            label: 'Document-0-1.doc'
          },
          {
            id: '0-1-2',
            parent_id: '0-0',
            isFolder: false,
            label: 'Document-0-2.doc'
          },
          {
            id: '0-1-3',
            parent_id: '0-0',
            isFolder: false,
            label: 'Document-0-3.doc'
          },
          {
            id: '0-1-4',
            parent_id: '0-0',
            isFolder: false,
            label: 'Document-0-4.doc'
          }
        ]
      }
    ]
  },
  {
    id: '1',
    parent_id: null,
    isFolder: true,
    label: 'Desktop',
    children: [
      {
        id: '1-0',
        parent_id: '1',
        isFolder: false,
        label: 'document1.doc'
      },
      {
        id: '0-0',
        parent_id: '1',
        isFolder: false,
        label: 'documennt-2.doc'
        // actions: [
        //   <button type="button">edit</button>,
        //   <button type="button">delete</button>
        // ]
      }
    ]
  },
  {
    id: '2',
    label: 'Downloads',
    parent_id: null,
    isFolder: true,
    children: []
  }
];

function QueryPanel() {
  const [data, setData] = useState(treeData);
  const [showSelector, setShowSelector] = useState(false);
  function handleShowSelector() {
    setShowSelector(true);
  }
  // function handleHideSelector() {
  //   setShowSelector(false);
  // }

  function handleSelect(node) {
    console.log(node);
  }

  function handleRefresh(dataset) {
    setData(dataset);
  }

  return (
    <div className={styles.root}>
      <button type="button" onClick={handleShowSelector}>
        Select universe
      </button>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <TreeView
            data={data}
            onSelect={handleSelect}
            onRefresh={handleRefresh}
          />
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.section}>objects</div>
          <div className={styles.section}>filters</div>
          <div className={styles.section}>results</div>
        </div>
      </div>

      {showSelector && <div>Select universe</div>}
    </div>
  );
}

export default QueryPanel;
