/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useState } from 'react';

import IconButton from '../../../../common/components/IconButton';
import DeleteIcon from '../../../../layout/assets/close.svg';
import DeleteItemModal from '../DeleteItemModal';
import styles from './TablesListItem.module.scss';

function TablesListItem({ id, name, onDoubleClick, item }) {
  const [isActive, setActive] = useState(false);
  const [isDeleteModalOpen, setDelModOpen] = useState(false);

  const handleOpenDeleteModalOpen = () => {
    setDelModOpen(!isDeleteModalOpen);
  };

  const handleClick = (e) => {
    if (e.target.id) {
      onDoubleClick(id);
      setActive(true);
      setTimeout(() => setActive(false), 1000);
    }
  };

  const standardColor = `rgba(64, 107, 169, 1)`;
  const hoveredColor = `rgba(255, 167, 64, 1)`;

  const setStrokeColor = (item, color) => {
    const elem = document.getElementById(`pathID_${item.id}`);
    elem.style.stroke = color;
  };

  return (
    <>
      <div
        id={name + id}
        className={clsx(styles.root, isActive && styles.active)}
        onDoubleClick={handleClick}
        onMouseEnter={() => setStrokeColor(item, hoveredColor)}
        onMouseLeave={() => setStrokeColor(item, standardColor)}
      >
        {name}
        <IconButton
          onClick={handleOpenDeleteModalOpen}
          size="12px"
          icon={<DeleteIcon />}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteItemModal onClose={handleOpenDeleteModalOpen} linkId={id} />
      )}
    </>
  );
}

export default TablesListItem;
