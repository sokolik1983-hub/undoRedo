import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "./FilterItem.module.scss";
import TextInput from '../../../../common/components/TextInput';
import DropdownWithPortal from "./DropdownWithPortal";
import DropdownMenuWithPortal from "./DropdownMenuWithPortal";
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';

const FilterItem = ({id, title, type, text, value, onDeleteFilterItem}) => {
  const [isActive, setIsActive] = useState(false);
  const [value1, setValue] = useState(value);
  

  const chooseIcon = () => {
    switch (type) {
      case 'attribute':
        return <AttributeIcon />
      case 'gauge':
        return <GaugeIcon />
      case 'measurement':
        return <MeasurementIcon />
      default:
        return null;
    }
  };

  const handleDelete = () => {
    onDeleteFilterItem(id);
  };

  return (
    <div 
      id={id}
      className={isActive ? styles.activeBlock : styles.block}
      draggable
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div>{chooseIcon(type)}</div>
      <p className={styles.title}>{title}</p>
      <DropdownWithPortal 
        text={text}
      />
      <TextInput 
        className={styles.input} 
        placeholder='введите постоянную'
        id={id}
        type="text"
        label=''
        value={value1}
        onChange={e => setValue(e.target.value)}
      />
      <div className={styles.menu}>
        <DropdownMenuWithPortal />
      </div>
      <div onClick={handleDelete} className={styles.close}>
        <CloseIcon fill='#000000' />
      </div>
    </div>
  );
};

export default FilterItem;

FilterItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  onDeleteFilterItem: PropTypes.func,
};
