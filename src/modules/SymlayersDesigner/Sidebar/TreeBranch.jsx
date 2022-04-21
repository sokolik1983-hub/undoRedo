import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';

const TreeBranch = ({treeData, idx, name, onSelect}) => {
  const [isActive, setActive] = useState(false);

  return (
    <div name={name}>
      <div onClick={() => setActive(!isActive)}>
        <TreeItem id={idx} name={name} isTable />
      </div>
      {isActive && treeData[name].map(item => (
        <TreeItem id={idx} name={name} item={item} onSelect={onSelect} />
      ))}
    </div>
  )
}

TreeBranch.propTypes = {
  treeData: PropTypes.object,
  idx: PropTypes.number,
  name: PropTypes.string,
  onSelect: PropTypes.func
}

export default TreeBranch;