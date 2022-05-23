/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import TextInput from '../../../common/components/TextInput';
import { ReactComponent as DotsMenu } from '../../../layout/assets/dotsMenu.svg';
import { ReactComponent as CloseInput } from '../../../layout/assets/schemaEditorBlock/closeInput.svg';
import { ReactComponent as MagnifierWhite } from '../../../layout/assets/schemaEditorBlock/magnifierWhite.svg';
import styles from './SchemaEditorBlock.module.scss';
import { ReactComponent as Arrow } from '../../../layout/assets/queryPanel/arrowOk.svg';
import Tooltip from '../../../common/components/Tooltip';
import IconButton from '../../../common/components/IconButton';

// const data = [
//   { text: 'Колонка', id: '1' },
//   { text: 'Колонка 1', id: '2' },
//   { text: 'Колонка 2', id: '3' },
//   { text: 'Колонка 3', id: '4' },
//   { text: 'Колонка 4', id: '5' },
//   { text: 'Колонка 5', id: '6' },
//   { text: 'Колонка 6', id: '7' },
//   { text: 'Колонка 7', id: '8' }
// ];

const items = [
  { text: 'Псевдоним' },
  { text: 'Изменить вид' },
  { text: 'Определение ключей' },
  { text: 'Определение числа элементов' },
  { text: 'Определение числа строк' },
  { text: 'Предпросмотр таблицы', value: 'tablePreview' }
];

const ShemaEditorBlock = ({
  onTableDragStart,
  selectedTableName,
  selectedTableColumns = [],
  onTablePreviewClick,
  onFieldDragStart
}) => {
  const [filterableFields, setFilterableFields] = useState(
    selectedTableColumns
  );
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) setFilterableFields(selectedTableColumns);
  }, [isLoaded]);

  useEffect(() => {
    if (selectedTableColumns.length) {
      setLoaded(true);
    }
  }, [selectedTableColumns]);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  const handleClick = item => {
    if (item.value === 'tablePreview') {
      return onTablePreviewClick();
    }
    return console.log(item.text);
  };

  const handleSearch = e => {
    const { value } = e.target;

    setSearchValue(value);
    setFilterableFields(
      selectedTableColumns?.filter(i => {
        return i.field.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const onCloseInput = () => {
    setIsActive(!isActive);
    setSearchValue('');
    setFilterableFields(selectedTableColumns);
  };

  const menu = () => (
    <div className={styles.itemsWrapper}>
      {items.map(i => (
        <DropdownItem
          item={i}
          onClick={() => handleClick(i)}
          className={styles.text}
        />
      ))}
    </div>
  );

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
            onDoubleClick={() => setIsOpened(prev => !prev)}
          >
            {selectedTableName}
          </h1>
          <div className={styles.iconsContainer}>
            <Tooltip
              placement="bottom"
              overlay={isOpened ? 'Свернуть таблицу' : 'Развернуть таблицу'}
            >
              <Arrow
                onClick={() => setIsOpened(prev => !prev)}
                className={
                  isOpened ? styles.arrowBtnOpened : styles.arrowBtnClosed
                }
              />
            </Tooltip>
            <MagnifierWhite
              onClick={() => setIsActive(!isActive)}
              className={styles.magnifier}
            />
            <Dropdown
              trigger={['click']}
              overlay={menu()}
              align={{
                offset: [45, -50]
              }}
            >
              <IconButton className={styles.dottedBtn} icon={<DotsMenu />} />
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
          <CloseInput className={styles.icon} onClick={onCloseInput} />
        </div>
      </div>
      {isOpened && (
        <div className={contentClasses}>
          <ul className={styles.list}>
            <DropdownItem
              item=""
              onClick={handleClick}
              className={styles.search}
            />

            {filterableFields.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className={styles.item} key={item.field + item.type + index} draggable onDragStart={e => onFieldDragStart(e, item.field)}>
                {item.field}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShemaEditorBlock;
