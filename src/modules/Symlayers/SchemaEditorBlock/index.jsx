/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import clsx from 'clsx';
import ReactDOM from 'react-dom';
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
import ModalConfirmDeletion  from '../../../common/components/Modal/ModalConfirmDeletion';

const items = [
  { text: 'Псевдоним' },
  { text: 'Изменить вид' },
  { text: 'Определение ключей' },
  { text: 'Определение числа элементов' },
  { text: 'Определение числа строк' },
  { text: 'Предпросмотр таблицы', value: 'tablePreview' },
  { text: 'Удалить таблицу', value: 'deleteTable' }
];

const modalWarningText =
  'Будет удалена таблица и все связи с этой таблицей, включая объекты. Вы уверены?';

const SchemaEditorBlock = ({
  onTableDragStart,
  selectedTableName,
  selectedTableColumns = [],
  onTablePreviewClick,
  onCloseSchemaEditorBlock,
  isHighlight,
  selectedTableFullName,
}) => {
  const [filterableFields, setFilterableFields] = useState(
    selectedTableColumns
  );
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [isDeleteWarningModalOpened, setDeleteWarningModalOpened] = useState(
    false
  );

  useEffect(() => {
    setFilterableFields(selectedTableColumns);
  }, [selectedTableColumns]);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  const handleClick = item => {
    if (item.value === 'tablePreview') {
      return onTablePreviewClick();
    }
    if (item.value === 'deleteTable') {
      return setDeleteWarningModalOpened(true);
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
        <div
          className={styles.header}
          onMouseDown={event => {
              event.stopPropagation();
              if (event.button !== 0) return;
              onTableDragStart(event);
            }}
          onDoubleClick={() => setIsOpened(prev => !prev)}
        >
          <h1
            className={styles.heading}
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
              <IconButton
                size="small"
                className={styles.dottedBtn}
                icon={<DotsMenu />}
              />
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
              <li
                className={
                  item.colored && isHighlight
                    ? styles.itemHighlited
                    : styles.item
                }
                // eslint-disable-next-line react/no-array-index-key
                key={item.field + item.type + index}
              >
                {item.field}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isDeleteWarningModalOpened &&
        ReactDOM.createPortal(
          <ModalConfirmDeletion
            warnText={modalWarningText}
            setDeleteWarningModalOpened={setDeleteWarningModalOpened}
            selectedTableFullName={selectedTableFullName}
            onCloseSchemaEditorBlock={onCloseSchemaEditorBlock}
          />,
          document.body
        )}
    </div>
  );
};

export default SchemaEditorBlock;
