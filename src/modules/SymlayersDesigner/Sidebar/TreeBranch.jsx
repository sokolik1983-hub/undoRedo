import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import style from './Sidebar.module.scss';
import TreeItem from './TreeItem';

const TreeBranch = ({ treeData, idx, name, onSelect, opened, searchMod }) => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setActive(opened);
  }, [opened]);

  return (
    <div>
      <div onClick={() => setActive(!isActive)}>
        <TreeItem id={idx} name={name} isSchema isOpen={opened} />
      </div>
      <div className={isActive ? style.actListItems : style.disListItems}>
        {treeData[name].map((item) => (
          <TreeItem
            id={idx}
            key={item.objectName}
            name={item.objectName}
            table={item}
            onSelect={onSelect}
            searchMod={searchMod}
          />
        ))}
      </div>
    </div>
  );
};

TreeBranch.propTypes = {
  treeData: PropTypes.object,
  idx: PropTypes.number,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  opened: PropTypes.bool,
};

export default TreeBranch;
