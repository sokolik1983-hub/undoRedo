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

const items = [
  { text: 'Псевдоним' },
  { text: 'Изменить вид' },
  { text: 'Определение ключей' },
  { text: 'Определение числа элементов' },
  { text: 'Определение числа строк' },
  { text: 'Предпросмотр таблицы', value: 'tablePreview' }
];

const SchemaEditorBlock = ({
  onTableDragStart,
  selectedTableName,
  selectedTableColumns = [],
  onTablePreviewClick,
  isHighlight
}) => {
  const [filterableFields, setFilterableFields] = useState(
    selectedTableColumns
  );
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    setFilterableFields(selectedTableColumns);
  }, [selectedTableColumns]);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  const handleClick = (item) => {
    if (item.value === 'tablePreview') {
      return onTablePreviewClick();
    }
    return console.log(item.text);
  };

  const handleSearch = e => {
    const {value} = e.target; 

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
    setFilterableFields(selectedTableColumns)
  }

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
            <Tooltip content={isOpened ? 'Свернуть таблицу' : 'Развернуть таблицу'} position='bottom'>
              <Arrow
                onClick={() => setIsOpened(prev => !prev)}
                className={isOpened ? styles.arrowBtnOpened : styles.arrowBtnClosed}
              />
            </Tooltip>
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
                  key={Math.random()*100}
                  item={i}
                  onClick={() => handleClick(i)}
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
            onClick={onCloseInput}
          />
        </div>
      </div>
      {isOpened && (
      <div className={contentClasses}>
        <ul className={styles.list}>
          <DropdownItem
            item=''
            onClick={handleClick}
            className={styles.search}
          />

          {filterableFields.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className={item.colored && isHighlight ? styles.itemHighlited : styles.item} key={item.field + item.type + index}>
              {item.field}
            </li>
          ))}
        </ul>
      </div>
)}
    </div>
  );
};

export default SchemaEditorBlock;
