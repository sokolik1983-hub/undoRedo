/* eslint-disable react/prop-types */
import lodash from 'lodash';
import React, { useEffect, useState } from 'react';
import TreeBranch from './TreeBranch';

export default function HierTreeView({ data, onSelect, isOpen }) {
  const [treeData, setTreeData] = useState({});

  useEffect(() => {
    if (data) {
      setTreeData(lodash.groupBy(data, item => item.schema));
    }
  }, [data]);

  return (
    <>
      {lodash.keys(treeData).map((key, idx) => {
        return (
          <TreeBranch name={key} idx={idx} treeData={treeData} onSelect={onSelect} opened={isOpen} /> 
        )
      })}
    </>
  );
}
