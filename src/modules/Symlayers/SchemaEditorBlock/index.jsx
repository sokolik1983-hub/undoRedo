/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext
} from 'react';
import { useDispatch , useSelector } from 'react-redux';
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
import CreateCopyModal from './CreateCopyModal';
import ModalConfirmDeletion from '../../../common/components/Modal/ModalConfirmDeletion';
import { addCoordToTables } from '../../../data/reducers/schemaDesigner';


const items = [
  { text: 'Псевдоним', value: 'copy' },
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
  addRefToColumns,
  addRefToTable,
  addRefToHeader,
  onTablePreviewClick,
  onCloseSchemaEditorBlock,
  isHighlight,
  selectedTableFullName,
  onDeleteTable,
  tableItem,
  tableId,
  onFieldDragStart,
  onFieldDragOver,
  onCreate,
  synoName,
  setSynoName,
  isShadow,
  columns,
  setTablesRefs,
  forceUpdate
}) => {
  const [filterableFields, setFilterableFields] = useState(
    selectedTableColumns
  );
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [isCopy, setIsCopy] = useState(false);
  const [isDeleteWarningModalOpened, setDeleteWarningModalOpened] = useState(
    false
  );
  const [fieldsCount, setFieldsCount] = useState(selectedTableColumns.length);
  const [portsRefs, setPortsRef] = useState(null);
  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const fieldRefs = useRef([React.createRef(), React.createRef()]);

  const dispatch = useDispatch();

  const updateFieldsCount = value => {
    setFieldsCount(value);
    fieldRefs.current = fieldRefs.current.splice(0, value);
    for (let i = 0; i < value; i++) {
      fieldRefs.current[i] = fieldRefs.current[i] || React.createRef();
    }
    fieldRefs.current = fieldRefs.current.map(
      fieldRef => fieldRef || React.createRef()
    );
    setPortsRef([...fieldRefs.current]);
    addRefToColumns([...fieldRefs.current]);
  };

  useEffect(() => {
    updateFieldsCount(fieldsCount);
  }, [filterableFields.length])

  useEffect(() => {
    if (!portsRefs?.length && filterableFields.length)
      updateFieldsCount(filterableFields.length)
  }, [portsRefs])

  useEffect(() => {
    fieldRefs?.current[fieldRefs?.current.length - 1]?.current?.focus();
  }, [fieldsCount]);

  useEffect(() => {
    if (tableRef) {
      addRefToTable(tableRef);
    }
  }, [tableRef]);

  useEffect(() => {
    if (headerRef) {
      addRefToHeader(headerRef);
    }
  }, [headerRef]);

  useEffect(() => {
    const tableRefCoord = {};
    const pageX =
      window.pageXOffset + headerRef?.current?.getBoundingClientRect().left;
    const pageY =
      window.pageYOffset + headerRef?.current?.getBoundingClientRect().top;
    tableRefCoord[tableId] = { pageX, pageY };
    dispatch(addCoordToTables(tableRefCoord));
  }, [headerRef, tableRef]);


  useEffect(() => {
    setTimeout(() => {
      setFilterableFields(selectedTableColumns);
    }, 50);
  }, [selectedTableColumns]);

  const contentClasses = clsx(styles.content, {
    [styles.contentWithSearch]: isActive
  });

  useEffect(forceUpdate, [isOpened]);

  const handleClick = item => {
    if (item.value === 'tablePreview') {
      return onTablePreviewClick();
    }
    if (item.value === 'copy') {
      return setIsCopy(true);
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

  const highlightOutline = filterableFields.filter(i => i.colored).length
    ? styles.wrapperHighlight
    : styles.wrapper;

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
          key={i.text}
          onClick={() => handleClick(i)}
          className={styles.text}
        />
      ))}
    </div>
  );

  return (
    // <div className={highlightOutline} ref={refs.current.tableRef}>
    <div className={highlightOutline} ref={tableRef}> 
      <div
        // ref={refs.current.headerRef}
        className={styles.header}
        onMouseDown={event => {
          event.stopPropagation();
          if (event.button !== 0) return;
          onTableDragStart(event);
        }}
        onDoubleClick={() => setIsOpened(prev => !prev)}
        ref={headerRef}
      >
        <div className={styles.heading}>{selectedTableName}</div>
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
      {isActive && (
        <div className={styles.inputWrapper}>
          <TextInput
            className={styles.input}
            onChange={handleSearch}
            value={searchValue}
            id="1"
            type="text"
          />
          <CloseInput className={styles.icon} onClick={onCloseInput} />
        </div>
      )}
      {isOpened && (
        <div className={contentClasses} onScroll={forceUpdate}>
          <ul className={styles.list}>
            <DropdownItem
              item=""
              onClick={handleClick}
              className={styles.search}
            />

            {/* {filterableFields?.map((item, index) => {
              const port = refs?.current?.ports
                ? refs.current.ports.find(column => column.key === item.field)
                : {};

              return (
                <li
                  ref={port.ref}
                  className={
                    item.colored && isHighlight
                      ? styles.itemHighlited
                      : styles.item
                  }
                  key={item.field + item.type + index}
                  draggable
                  onDragStart={e => onFieldDragStart(e, item.field)}
                >
                  {item.field}
                </li>
              );
            })} */}
            {filterableFields.map((item, index) => (
              <li
                className={
                  item.colored && isHighlight
                    ? styles.itemHighlited
                    : styles.item
                }
                key={item.field + item.type}
                draggable
                onDragStart={e => onFieldDragStart(e, item, tableItem)}
                onDrop={e => onFieldDragOver(e, item, tableItem)}
                ref={fieldRefs.current[index]}
              >
                {item.field}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isCopy && (
        <CreateCopyModal
          onCancel={() => {
            setIsCopy(false);
          }}
          create={onCreate}
          newName={synoName}
          setNewName={setSynoName}
          oldName={selectedTableName}
        />
      )}
      {isDeleteWarningModalOpened &&
        ReactDOM.createPortal(
          <ModalConfirmDeletion
            warnText={modalWarningText}
            setDeleteWarningModalOpened={setDeleteWarningModalOpened}
            selectedTableFullName={selectedTableFullName}
            onCloseSchemaEditorBlock={onCloseSchemaEditorBlock}
            isDeleteWarningModalOpened={isDeleteWarningModalOpened}
            onDeleteTable={onDeleteTable}
            tableItem={tableItem}
          />,
          document.body
        )}
    </div>
  );
};

export default SchemaEditorBlock;
