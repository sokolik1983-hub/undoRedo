import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState } from 'react';

import IconButton from '../../../../common/components/IconButton';
import BlackCross from '../../../../layout/assets/closeBlack.svg';
import { getIconByItemType } from '../../queryPanelHelper';
import styles from './Object.module.scss';

const ObjectItem = ({ title, type, onDeleteItem, ...props }) => {
  const [isActive, setIsActive] = useState(false);

  const buttonStyles = clsx(styles.btn, {
    [styles.active]: isActive,
  });

  return (
    <div
      {...props}
      className={styles.wrapper}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={isActive ? styles.active : null}>
        {getIconByItemType(type)}
      </div>
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
  type: PropTypes.number,
  onDeleteItem: PropTypes.func,
};
