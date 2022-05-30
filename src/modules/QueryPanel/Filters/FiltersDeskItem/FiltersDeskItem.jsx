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
  { text: 'равно', value: 'EQUAL' },
  { text: 'в списке', value: 'IN' },
  { text: 'не в списке', value: 'NOT_IN' },
  { text: 'между', value: 'BETWEEN' },
  { text: 'более чем', value: 'MORE_THAN' },
  { text: 'более чем или равно', value: 'MORE_THAN_EQUAL' },
  { text: 'меньше чем', value: 'LESS_THAN' },
  { text: 'меньше чем или равно', value: 'LESS_THAN_EQUAL' },
  { text: 'соответсвие образцу', value: 'LIKE' }
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
  const [filterValue, setFilterValue] = useState(EMPTY_STRING);
  const [filterValueBetween, setFilterValueBetween] = useState({
    from: '',
    to: ''
  });
  const [filterType, setFilterType] = useState('равно');

  const root = clsx(styles.root, {
    [styles.active]: isActive,
    [styles.selected]: focused?.id === id
  });

  const onEdit = e => {
    setFilterValue(e.target.value);
  };

  const handleChangeBetween = event => {
      setFilterValueBetween({
        ...filterValueBetween,
        [event.target.name]: event.target.value
      });
  };

  const handleSelectFilterType = typeOfFilter => {
    setFilterType(typeOfFilter);
    setFilterValue('');
    setFilterValueBetween({ from: '', to: '' });
  };

  useEffect(() => {
    onEditItem(id, filterValue, filterValueBetween, filterType);
  }, [filterValue, filterType, filterValueBetween]);

  useEffect(() => {
    if (filterValueBetween.from || filterValueBetween.to) {
      onEditItem(id, filterValueBetween.from, filterValueBetween.to, filterType);
    };
  }, [filterValueBetween, filterType]);

  const menu = () => (
    <div className={styles.optionsWrapper}>
      {options.map(i => (
        <DropdownItem
          key={i.value}
          item={i}
          className={styles.optionsText}
          onClick={() => {handleSelectFilterType(i.text)}}
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
          <p className={styles.selectText}>{filterType}</p>
          <Arrow className={styles.arrow} />
        </div>
      </Dropdown>
      { filterType === 'между' ? (
        <>
          <TextInput
            className={styles.input}
            placeholder="введите постоянную"
            type='text'
            label={EMPTY_STRING}
            name='from'
            value={filterValueBetween.from}
            onChange={handleChangeBetween}
          />
          <p className={styles.title}>И</p>
          <TextInput
            className={styles.input}
            placeholder="введите постоянную"
            type='text'
            label={EMPTY_STRING}
            name='to'
            value={filterValueBetween.to}
            onChange={handleChangeBetween}
          />
        </>
      ) : (
        <TextInput
          className={styles.input}
          placeholder="введите постоянную"
          type='text'
          label={EMPTY_STRING}
          value={filterValue}
          onChange={e => onEdit(e)}
        />
      )}
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
