/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import clsx from 'clsx';
import React, { useState } from 'react';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import TextInput from '../../../common/components/TextInput';
import { ReactComponent as DotsMenu } from '../../../layout/assets/dotsMenu.svg';
import { ReactComponent as CloseInput } from '../../../layout/assets/schemaEditorBlock/closeInput.svg';
import { ReactComponent as MagnifierWhite } from '../../../layout/assets/schemaEditorBlock/magnifierWhite.svg';
import styles from './SchemaEditorBlock.module.scss';

const data = [
  { text: 'Колонка', id: '1' },
  { text: 'Колонка 1', id: '2' },
  { text: 'Колонка 2', id: '3' },
  { text: 'Колонка 3', id: '4' },
  { text: 'Колонка 4', id: '5' },
  { text: 'Колонка 5', id: '6' },
  { text: 'Колонка 6', id: '7' },
  { text: 'Колонка 7', id: '8' }
];

const items = [
  { text: 'Псевдоним' },
  { text: 'Изменить вид' },
  { text: 'Определение ключей' },
  { text: 'Определение числа элементов' },
  { text: 'Определение числа строк' }
];

const ShemaEditorBlock = ({
  heading = 'MR_D_Options DTF',
  onTableDragStart
}) => {
  const [filterableFields, setFilterableFields] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  const handleClick = () => {
    console.log('click from ShemaEditorBlock');
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

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.header}>
          <h1
            className={styles.heading}
            onMouseDown={event => {
              event.stopPropagation();
              if (event.button !== 0) return;
              onTableDragStart(event);
            }}
          >
            {heading}
          </h1>
          <div className={styles.iconsContainer}>
            <MagnifierWhite
              onClick={() => setIsActive(!isActive)}
              className={styles.magnifier}
            />
            <Dropdown
              className={styles.buttonIndents}
              mainButton={<DotsMenu className={styles.menu} />}
              itemsWrapper={styles.itemsWrapper}
            >
              {items.map(i => (
                <DropdownItem
                  item={i}
                  onClick={handleClick}
                  className={styles.text}
                />
              ))}
            </Dropdown>
          </div>
        </div>
        <div className={isActive ? styles.inputWrapper : styles.hide}>
          <TextInput
            className={styles.input}
            onChange={handleSearch}
            value={searchValue}
            id="1"
            type="text"
          />
          <CloseInput
            className={styles.icon}
            onClick={() => setIsActive(!isActive)}
          />
        </div>
      </div>
      <div className={contentClasses}>
        <ul className={styles.list}>
          <DropdownItem
            item=""
            onClick={handleClick}
            className={styles.search}
          />
          {filterableFields.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className={styles.item} key={idx}>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShemaEditorBlock;
