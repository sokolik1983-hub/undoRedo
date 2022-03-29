import React from 'react';
import PropTypes from 'prop-types';
import styles from './Object.module.scss';
import { ReactComponent as BlackCross} from '../../../../layout/assets/closeBlack.svg' 
import { ReactComponent as OrangeIcon } from '../../../../layout/assets/queryPanel/orangeIcon.svg';
import { ReactComponent as GreenIcon } from '../../../../layout/assets/queryPanel/greenIcon.svg';
import { ReactComponent as BlueIcon } from '../../../../layout/assets/queryPanel/blueIcon.svg';

const ObjectItem = ({id, title, type, onDeleteObjItem}) => {
  
  const handleDelete = () => {
    onDeleteObjItem(id);
  }

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

  return (
    <div className={styles.wrapper} id={`object-${id}`}>
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
  onDeleteObjItem: PropTypes.func
};