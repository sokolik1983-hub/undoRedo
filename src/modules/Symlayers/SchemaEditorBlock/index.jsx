import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SchemaEditorBlock.module.scss';
import { ReactComponent as DotsMenu } from '../../../layout/assets/dotsMenu.svg';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import SchemaEditorSearch from './SchemaEditorSearch';

const data = [
  'База базаз',
  'Правая база',
  'База 54',
  'База Дурости',
  'База Умных',
  'База Странных',
  'База Левых',
  'База правых'
];

const items = [
  {text: 'Алиас', id: '1'},
  {text: 'Изменить вид', id: '2'},
  {text: 'Определение ключей', id: '3'},
  {text: 'Определение числа элементов', id: '4'},
  {text: 'Определение числа строк', id: '5'},
];

// eslint-disable-next-line react/prop-types
const ShemaEditorBlock = ({ heading='MR_D_Options DTF' }) => {
  const [filterableFields, setFilterableFields] = useState(items);
  const [searchValue, setSearchValue] = useState('');

  const handleClick = () => {
    console.log('click from ShemaEditorBlock')
  };

  const handleSearch = e => {
    const value = e.target.value.toLowerCase();

    setSearchValue(value);
    setFilterableFields(items.filter(i => {
      return i.text.toLowerCase().includes(value);
    }));
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.heading}>{ heading }</h1>
        <Dropdown 
          notHideable
          className={styles.buttonIndents} 
          mainButton={<DotsMenu className={styles.menu} />} 
          itemsWrapper={styles.itemsWrapper}
        >
          <DropdownItem item='' onClick={handleClick} className={styles.search}>
            <SchemaEditorSearch onChange={handleSearch} value={searchValue} />
          </DropdownItem>
          {filterableFields.map(i => (
            <DropdownItem item={i} onClick={handleClick} className={styles.text} key={i.id} />
          ))}
        </Dropdown>
      </header>
      <div className={styles.content}>
        <ul className={styles.list}>
          {data.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className={styles.item} key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default ShemaEditorBlock;

SchemaEditorSearch.propTypes = {
  heading: PropTypes.string,
};

SchemaEditorSearch.defaultProps = {
  heading: ''
};