import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';
import TextInput from '../../../../common/components/TextInput';
import DropdownMenuWithPortal from '../FilterItem/DropdownMenuWithPortal';
import DropdownWithPortal from '../FilterItem/DropdownWithPortal';
import IconButton from '../../../../common/components/IconButton';
import { getIconByItemType } from '../../queryPanelHelper';
import { EMPTY_STRING } from '../../../../common/constants/common';
import styles from './FiltersDeskItem.module.scss';

const FiltersDeskItem = ({
  title,
  type,
  onItemClick,
  onDeleteItem,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState(EMPTY_STRING);

  const root = clsx(styles.root, {
    [styles.active]: isActive
  });

  return (
    <div
      {...props}
      role="button"
      tabIndex="0"
      className={root}
      onClick={onItemClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onDragEnter={() => setIsActive(true)}
      onDragLeave={() => setIsActive(false)}
    >
      <div className={styles.icon}>{getIconByItemType(type)}</div>
      <p className={styles.title}>{title}</p>
      <DropdownWithPortal text="равно" />
      <TextInput
        className={styles.input}
        placeholder="введите постоянную"
        type="text"
        label={EMPTY_STRING}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <div className={styles.menu}>
        <DropdownMenuWithPortal />
      </div>
      <IconButton
        className={styles.closeBtn}
        icon={<CloseIcon className={styles.closeBtnIcon} />}
        onClick={onDeleteItem}
      />
    </div>
  );
};

export default FiltersDeskItem;

FiltersDeskItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  onItemClick: PropTypes.func,
  onDeleteItem: PropTypes.func
};
