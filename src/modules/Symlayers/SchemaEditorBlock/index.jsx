/* eslint-disable no-shadow */
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './SchemaEditorBlock.module.scss';
import { ReactComponent as DotsMenu } from '../../../layout/assets/dotsMenu.svg';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import { ReactComponent as MagnifierWhite } from '../../../layout/assets/schemaEditorBlock/magnifierWhite.svg';
import { ReactComponent as CloseInput } from '../../../layout/assets/schemaEditorBlock/closeInput.svg';
import TextInput from '../../../common/components/TextInput';

const data = [
  {text: 'База базаз', id: '1'},
  {text: 'Изменить вид', id: '2'},
  {text: 'Правая база', id: '3'},
  {text: 'База 54', id: '4'},
  {text: 'База Дурости', id: '5'},
  {text: 'База Умных', id: '6'},
  {text: 'База Странных', id: '7'},
  {text: 'База Левых', id: '8'},
  {text: 'База правых', id: '9'},
  {text: 'База базаз', id: '1'},
  {text: 'Изменить вид', id: '2'},
  {text: 'Правая база', id: '3'},
  {text: 'База 54', id: '4'},
  {text: 'База Дурости', id: '5'},
  {text: 'База Умных', id: '6'},
  {text: 'База Странных', id: '7'},
  {text: 'База Левых', id: '8'},
  {text: 'База правых', id: '9'},
];

const items = [
  {text: 'Псевдоним'},
  {text: 'Изменить вид'},
  {text: 'Определение ключей'},
  {text: 'Определение числа элементов'},
  {text: 'Определение числа строк'},
];

// eslint-disable-next-line react/prop-types
const ShemaEditorBlock = ({ heading='MR_D_Options DTF' }) => {
  const [filterableFields, setFilterableFields] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  const handleClick = () => {
    console.log('click from ShemaEditorBlock')
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();

    setSearchValue(value);
    setFilterableFields(data.filter(i => {
      return i.text.toLowerCase().includes(value);
    }));
  };

  return (
    <div className={styles.wrapper} id='123' draggable>
      <div>
        <div className={styles.header}>
          <h1 className={styles.heading}>{ heading }</h1>
          <div className={styles.iconsContainer}>
            <MagnifierWhite onClick={() => setIsActive(!isActive)} className={styles.magnifier} />
            <Dropdown
              className={styles.buttonIndents} 
              mainButton={<DotsMenu className={styles.menu} />} 
              itemsWrapper={styles.itemsWrapper}
            >
              {items.map(i => (
                <DropdownItem item={i} onClick={handleClick} className={styles.text} />
                ))}
            </Dropdown>
          </div>
        </div>
        <div className={isActive ? styles.inputWrapper : styles.hide}>
          <TextInput className={styles.input} onChange={handleSearch} value={searchValue} id='1' type='text' />
          <CloseInput className={styles.icon} onClick={() => setIsActive(!isActive)} />
        </div>
      </div>
      <div className={contentClasses}>
        <ul className={styles.list}>
          <DropdownItem item='' onClick={handleClick} className={styles.search} />
          {filterableFields.map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
            <li className={styles.item} key={idx}>
              {item.text}
            </li>
            ))}
        </ul>
      </div>
    </div>
  )
};

export default ShemaEditorBlock;
