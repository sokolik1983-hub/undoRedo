/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';
import { ReactComponent as Arrow } from '../../../../layout/assets/queryPanel/arrowThin.svg';
import TextInput from '../../../../common/components/TextInput';
import IconButton from '../../../../common/components/IconButton';
import { getIconByItemType } from '../../queryPanelHelper';
import { EMPTY_STRING } from '../../../../common/constants/common';
import styles from './FiltersDeskItem.module.scss';
import { useDragNDrop } from '../../context/DragNDropContext';
import DotsMenu from './DotsMenu/DotsMenu';
import DropdownItem from '../../../../common/components/Dropdown/DropdownItem';
import Dropdown from '../../../../common/components/Dropdown';

const options = [
  { text: 'не равно', value: 'notEqual' },
  { text: 'равно', value: 'equal' },
  { text: 'в списке', value: 'inList' },
  { text: 'не в списке', value: 'notInList' },
  { text: 'между', value: 'between' },
  { text: 'вне', value: 'outside' },
  { text: 'более чем', value: 'moreThan' },
  { text: 'более чем или равно', value: 'moreThanOrEqual' },
  { text: 'меньше чем', value: 'lessThan' },
  { text: 'меньше чем или равно', value: 'lessThanOrEqual' },
  { text: 'оба', value: 'both' },
  { text: 'исключая', value: 'exept' },
  { text: 'соответсвие образцу', value: 'like' }
];

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
  const [selectedText, setSelectedText] = useState('равно');

  const root = clsx(styles.root, {
    [styles.active]: isActive,
    [styles.selected]: focused?.id === id
  });

  const onEdit = e => {
    setInputValue(e.target.value);
  };

  const handleEditCondition = cond => {
    setSelectedCond(cond);
  };

  useEffect(() => {
    onEditItem(id, inputValue, selectedCond);
  }, [inputValue, selectedCond]);

  const menu = () => (
    <div className={styles.optionsWrapper}>
      {options.map(i => (
        <DropdownItem
          key={i.value}
          item={i}
          className={styles.optionsText}
          onClick={() => {}}
        />
      ))}
    </div>
  );

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
      {/* TODO: replace dropdown with custom select when ready */}
      <Dropdown trigger={['click']} overlay={menu()}>
        <div className={styles.select}>
          <p className={styles.selectText}>{selectedText}</p>
          <Arrow className={styles.arrow} />
        </div>
      </Dropdown>
      <TextInput
        className={styles.input}
        placeholder="введите постоянную"
        type="text"
        label={EMPTY_STRING}
        value={inputValue}
        onChange={e => onEdit(e)}
      />
      <DotsMenu />
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
