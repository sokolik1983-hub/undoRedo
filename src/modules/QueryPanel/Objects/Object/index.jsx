import React from 'react';
import PropTypes from 'prop-types';
import styles from './Object.module.scss';
import { ReactComponent as BlackCross} from '../../../../layout/assets/closeBlack.svg' 
import { ReactComponent as OrangeIcon } from '../../../../layout/assets/queryPanel/orangeIcon.svg';
import { ReactComponent as GreenIcon } from '../../../../layout/assets/queryPanel/greenIcon.svg';
import { ReactComponent as BlueIcon } from '../../../../layout/assets/queryPanel/blueIcon.svg';

const ObjectItem = ({id, title, type, onDeleteObjItem, onDragStart, onDragNDrop}) => {
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
    >
      <div>
        {chooseIcon(type)}
      </div>
      <span>
        {title.length > 16 ? `${title.substring(0, 16)}...` : title}
      </span>
      <button type='button' onClick={handleDelete}>
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