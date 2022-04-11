/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ItemsListModal.module.scss';
import Button from '../../../common/components/Button';
import Modal from '../../../common/components/Modal';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import TextInput from '../../../common/components/TextInput';
import { BUTTON } from '../../../common/constants/common';
import { ReactComponent as MeasurementIcon } from '../../../layout/assets/queryPanel/measurementIcon.svg';
import { ReactComponent as Reload } from '../../../layout/assets/queryPanel/reload.svg';
import { ReactComponent as Gear } from '../../../layout/assets/queryPanel/gearBold.svg';
import { ReactComponent as Dots } from '../../../layout/assets/queryPanel/dotsInCorner.svg';

const data = [
  { text: 'Колонка', id: '1' },
  { text: 'Колонка 1', id: '2' },
  { text: 'Колонка 2', id: '3' },
  { text: 'Колонка 3', id: '4' },
  { text: 'Колонка 4', id: '5' },
  { text: 'Колонка 5', id: '6' },
  { text: 'Колонка 6', id: '7' },
  { text: 'Колонка 7', id: '8' },
  { text: 'Колонка 8', id: '9' },
  { text: 'Колонка 9', id: '10' },
  { text: 'Колонка 10', id: '11' },
  { text: 'Колонка 11', id: '12' },
  { text: 'Колонка 12', id: '13' },
  { text: 'Колонка 13', id: '14' },
  { text: 'Колонка 14', id: '15' },
  { text: 'Колонка 15', id: '16' }
];

const items = [
  { text: 'с учетом регистра' },
  { text: 'искать в базе данных' },
  { text: 'искать по ключам' },
  { text: 'показать ключи' },
  { text: 'частичное совпадение' }
];

const ItemsListModal = ({ visible, onClose }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeItems, setActiveItems] = useState([]);
  const [filterableFields, setFilterableFields] = useState(data);

  const handleClose = () => {
    return onClose();
  };

  const handleReset = () => {
    setActiveItems([]);
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();

    setSearchValue(value);
    setFilterableFields(
      data.filter(i => {
        return i.text.toLowerCase().includes(value);
      })
    );
  };

  const handleChangeActiveItem = id => {
    if (activeItems.includes(id)) {
      const newArr = activeItems.filter(item => item !== id);
      setActiveItems(newArr);
    } else {
      setActiveItems([...activeItems, id]);
    }
  };

  const handleClick = () => {
    console.log('click from button');
  };

  const modalContent = () => {
    return (
      <div className={styles.root}>
        <div className={styles.topBlock}>
          <p className={styles.heading}>Список значений</p>
          <div className={styles.icons}>
            <Reload className={styles.iconsIndents} />
            <Dropdown
              className={styles.iconsIndents}
              mainButton={<Gear />}
              itemsWrapper={styles.itemsWrapper}
            >
              {items.map(i => (
                <DropdownItem
                  key={i.text}
                  item={i}
                  onClick={handleClick}
                  className={styles.text}
                />
              ))}
            </Dropdown>
          </div>
        </div>
        <div className={styles.searchBlock}>
          <p className={styles.search}>Поиск</p>
          <TextInput
            className={styles.input}
            onChange={handleSearch}
            value={searchValue}
            id="1"
            type="text"
            placeholder="Объект из таблицы"
          />
        </div>
        <div>
          <div className={styles.contentBlock}>
            <MeasurementIcon />
            <p className={styles.title}>Банковские проводки за февраль</p>
          </div>
          <DropdownItem
            item=""
            onClick={handleClick}
            className={styles.search}
          />
          <ul className={styles.list}>
            {filterableFields.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  handleChangeActiveItem(item.id);
                }}
                className={
                  activeItems.includes(item.id)
                    ? styles.activeItem
                    : styles.item
                }
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.chooseCountBlock}>
          <p className={styles.choose}>Выбрано:</p>
          <p className={styles.count}>{activeItems.length}</p>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={handleClick}
            buttonStyle={BUTTON.BIG_ORANGE}
            className={styles.button}
          >
            Ок
          </Button>
          <Button
            onClick={handleReset}
            buttonStyle={BUTTON.BIG_GRAY}
            className={styles.button}
          >
            Сброс
          </Button>
          <Button
            onClick={handleClose}
            buttonStyle={BUTTON.BIG_BLUE}
            className={styles.button}
          >
            Отмена
          </Button>
        </div>
        <Dots className={styles.dots} />
      </div>
    );
  };

  return (
    <Modal
      content={modalContent()}
      withScroll={false}
      visible={visible}
      onClose={handleClose}
      dialogClassName={styles.dialog}
      bodyClassName={styles.modalBody}
      contentClassName={styles.modalContent}
      headerClassName={styles.headerContent}
      withoutTitle
    />
  );
};

export default ItemsListModal;

ItemsListModal.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool.isRequired
};
