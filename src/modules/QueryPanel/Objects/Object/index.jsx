import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Object.module.scss';
import { ReactComponent as BlackCross } from '../../../../layout/assets/closeBlack.svg' 
import { ReactComponent as OrangeIcon } from '../../../../layout/assets/queryPanel/gauge-icon.svg';
import { ReactComponent as GreenIcon } from '../../../../layout/assets/queryPanel/attribute-icon.svg';
import { ReactComponent as BlueIcon } from '../../../../layout/assets/queryPanel/measurement-icon.svg';

const ObjectItem = ({id, title, type, onDeleteObjItem, onDragStart, onDragNDrop}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDelete = () => {
    onDeleteObjItem(id);
  };

  const chooseIcon = () => {
    switch (type) {
      case 'green':
        return <GreenIcon />
      case 'orange':
        return <OrangeIcon />
      case 'blue':
        return <BlueIcon />
      default:
        return null;
    }
  };

  const handleDragStart = () => {
    onDragStart(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDragNDrop(id);
  };

  return (
    <div 
      className={styles.wrapper} 
      id={`object-${id}`} 
      title={title}
      draggable
      onDragStart={handleDragStart}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={isActive ? styles.active : null}>
        {chooseIcon(type)}
      </div>
      <span title={title}>
        {title.length > 16 ? `${title.substring(0, 16)}...` : title}
      </span>
      <button type='button' onClick={handleDelete} className={isActive ? styles.active : null}>
        <BlackCross />    
      </button>
    </div>
  );
};

export default ObjectItem;

ObjectItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  onDeleteObjItem: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragNDrop: PropTypes.func
};
