import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TreeItem from './TreeItem';
import style from './Sidebar.module.scss';

const TreeBranch = ({treeData, idx, name, onSelect, opened}) => {
  const [isActive, setActive] = useState(false);
  console.log(treeData)

  useEffect(() => {
    setActive(opened)
  }, [opened])

  return (
    <div>
      <div onClick={() => setActive(!isActive)}>
        <TreeItem id={idx} name={name} isSchema isOpen={opened} />
      </div>
      <div className={isActive ? style.actListItems : style.disListItems}>
        {treeData[name].map((item) => (
          <TreeItem id={idx} key={item.objectName} name={item.objectName} table={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

TreeBranch.propTypes = {
  treeData: PropTypes.object,
  idx: PropTypes.number,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  opened: PropTypes.bool
}

export default TreeBranch;