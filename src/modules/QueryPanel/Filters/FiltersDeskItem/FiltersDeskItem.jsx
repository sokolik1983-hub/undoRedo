import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';
import TextInput from '../../../../common/components/TextInput';
import DropdownMenuWithPortal from '../FilterItem/DropdownMenuWithPortal';
import DropdownWithPortal from '../FilterItem/DropdownWithPortal';
import IconButton from '../../../../common/components/IconButton';
import { getIconByItemType } from '../../queryPanelHelper';
import { EMPTY_STRING } from '../../../../common/constants/common';
import styles from './FiltersDeskItem.module.scss';
import { useDragNDrop } from '../../context/DragNDropContex';

const FiltersDeskItem = ({
  id,
  title,
  type,
  onItemClick,
  onDeleteItem,
  onEditItem,
  ...props
}) => {
  const { focused } = useDragNDrop();
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const [selectedCond, setSelectedCond] = useState('равно');

  const root = clsx(styles.root, {
    [styles.active]: isActive,
    [styles.selected]: focused?.id === id
  });

  const onEdit = e => {
    setInputValue(e.target.value);
  };

  const handleEditCondition = cond => {
    setSelectedCond(cond);
  }

  useEffect(() => {
    onEditItem(id, inputValue, selectedCond);
  }, [inputValue, selectedCond]);

  return (
    <div
      {...props}
      className={root}
      onClick={onItemClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onDragEnter={() => setIsActive(true)}
      onDragLeave={() => setIsActive(false)}
    >
      <div className={styles.icon}>{getIconByItemType(type)}</div>
      <p className={styles.title}>{title}</p>
      <DropdownWithPortal text="равно" onCondChange={handleEditCondition} />
      <TextInput
        className={styles.input}
        placeholder="введите постоянную"
        type="text"
        label={EMPTY_STRING}
        value={inputValue}
        onChange={e => onEdit(e)}
      />
      <div className={styles.menu}>
        <DropdownMenuWithPortal />
      </div>
      <IconButton
        className={styles.closeBtn}
        icon={<CloseIcon className={styles.closeBtnIcon} />}
        onClick={e => {
          e.stopPropagation();
          onDeleteItem();
        }}
      />
    </div>
  );
};

export default FiltersDeskItem;

FiltersDeskItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.number,
  onItemClick: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func
};
