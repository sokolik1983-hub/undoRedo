import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './Sidebar.module.scss';
import { ReactComponent as GaugeIcon } from '../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as MeasIcon } from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as AttrIcon } from '../../../layout/assets/queryPanel/attributeIcon.svg';

const ObjectLayer = ({ field }) => {
  const [isActive, setActive] = useState(false); 
  const { name, objectType } = field;

  const selectIcon = (type) => {
    switch (type) {
      case 'Измерение' :
        return <MeasIcon />;
      case 'Показатель' :
        return <GaugeIcon />;
      case 'Атрибут' :
        return <AttrIcon />
      default :
        return <MeasIcon />;
    }
  };

  return (
    <button type="button" className={isActive ? styles.actObjectLayer : styles.objectLayer} onClick={() => setActive(!isActive)}>
      {selectIcon(objectType)}
      <span>
        {name || 'name'}
      </span>
    </button>
  )
}

ObjectLayer.propTypes = {
  field: PropTypes.object
}

export default ObjectLayer;