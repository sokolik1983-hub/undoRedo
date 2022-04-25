import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Object.module.scss';
import { ReactComponent as BlackCross } from '../../../../layout/assets/closeBlack.svg' 
import { ReactComponent as GaugeIcon } from '../../../../layout/assets/queryPanel/gauge_icon.svg';
import { ReactComponent as AttributeIcon } from '../../../../layout/assets/queryPanel/attributeIcon.svg';
import { ReactComponent as MeasurementIcon } from '../../../../layout/assets/queryPanel/measurementIcon.svg';
import IconButton from '../../../../common/components/IconButton';

const ObjectItem = ({ title, type, onDeleteItem, ...props }) => {
  const [isActive, setIsActive] = useState(false);

  const buttonStyles = clsx(styles.btn, {
    [styles.active]: isActive
  });

  const getIcon = objectTypeId => {
    switch (objectTypeId) {
      case 1:
        return <GaugeIcon />;
      case 2:
        return <MeasurementIcon />;
      case 3:
        return <AttributeIcon />;
      default:
        return null;
    }
  };

  return (
    <div
      {...props}
      className={styles.wrapper}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={isActive ? styles.active : null}>{getIcon(type)}</div>
      <span className={styles.title}>{title}</span>
      <IconButton
        className={buttonStyles}
        icon={<BlackCross />}
        onClick={onDeleteItem}
      />
    </div>
  );
};

export default ObjectItem;

ObjectItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onDeleteItem: PropTypes.func
};
