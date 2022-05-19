/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, { useState } from 'react';
import IconButton from '../../../../common/components/IconButton';
import { ReactComponent as DeleteIcon } from '../../../../layout/assets/close.svg';
import styles from './TablesListItem.module.scss';
import DeleteItemModal from '../DeleteItemModal';


function TablesListItem({ id, name, onDoubleClick }) {
  const [isActive, setActive] = useState(false);
  const [isDeleteModalOpen, setDelModOpen] = useState(false);

  const handleOpenDeleteModalOpen = () => {
    setDelModOpen(!isDeleteModalOpen);
  }

  const handleClick = (e) => {
    if (e.target.id) {
      onDoubleClick(id);
      setActive(true);
      setTimeout(() => setActive(false), 1000);
    } 
  };

  return (
    <>
      <div 
        id={name + id}
        className={clsx(styles.root, isActive && styles.active)}
        onDoubleClick={handleClick}
      >
        {name}
        <IconButton onClick={handleOpenDeleteModalOpen} size='12px' icon={<DeleteIcon />} />
      </div>
      {isDeleteModalOpen && <DeleteItemModal onClose={handleOpenDeleteModalOpen} linkId={id} /> }
    </>
  );
}

export default TablesListItem;
