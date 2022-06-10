/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import Dropdown from '../../../common/components/Dropdown';
import DropdownItem from '../../../common/components/Dropdown/DropdownItem';
import IconButton from '../../../common/components/IconButton';
import ModalConfirmDeletion from '../../../common/components/Modal/ModalConfirmDeletion';
import TextInput from '../../../common/components/TextInput';
import Tooltip from '../../../common/components/Tooltip';
import DotsMenu from '../../../layout/assets/dotsMenu.svg';
import Arrow from '../../../layout/assets/queryPanel/arrowOk.svg';
import CloseInput from '../../../layout/assets/schemaEditorBlock/closeInput.svg';
import MagnifierWhite from '../../../layout/assets/schemaEditorBlock/magnifierWhite.svg';
import CreateCopyModal from './CreateCopyModal';
import styles from './SchemaEditorBlock.module.scss';

const items = [
    {text: 'Псевдоним', value: 'copy'},
    {text: 'Изменить вид'},
    {text: 'Определение ключей'},
    {text: 'Определение числа элементов'},
    {text: 'Определение числа строк'},
    {text: 'Предпросмотр таблицы', value: 'tablePreview'},
    {text: 'Удалить таблицу', value: 'deleteTable'},
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
    onDeleteTable,
    tableItem,
    onFieldDragStart,
    onCreate,
    synoName,
    setSynoName,
}) => {
    const [filterableFields, setFilterableFields] =
        useState(selectedTableColumns);
    const [searchValue, setSearchValue] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isOpened, setIsOpened] = useState(true);
    const [isCopy, setIsCopy] = useState(false);
    const [isDeleteWarningModalOpened, setDeleteWarningModalOpened] =
        useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFilterableFields(selectedTableColumns);
        }, 50);
    }, [selectedTableColumns]);

    const contentClasses = clsx(styles.content, {
        [styles.contentWithSearch]: isActive,
    });

    const handleClick = (item) => {
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

    const handleSearch = (e) => {
        const {value} = e.target;

        setSearchValue(value);
        setFilterableFields(
            selectedTableColumns?.filter((i) => {
                return i.field.toLowerCase().includes(value.toLowerCase());
            }),
        );
    };

    const highlightOutline = filterableFields.filter((i) => i.colored).length
        ? styles.wrapperHighlight
        : styles.wrapper;

    const onCloseInput = () => {
        setIsActive(!isActive);
        setSearchValue('');
        setFilterableFields(selectedTableColumns);
    };

    const menu = () => (
        <div className={styles.itemsWrapper}>
            {items.map((i) => (
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
        <div className={highlightOutline}>
            <div
                className={styles.header}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    if (event.button !== 0) return;
                    onTableDragStart(event);
                }}
                onDoubleClick={() => setIsOpened((prev) => !prev)}
            >
                <div className={styles.heading}>{selectedTableName}</div>
                <div className={styles.iconsContainer}>
                    <Tooltip
                        placement="bottom"
                        overlay={
                            isOpened ? 'Свернуть таблицу' : 'Развернуть таблицу'
                        }
                    >
                        <Arrow
                            onClick={() => setIsOpened((prev) => !prev)}
                            className={
                                isOpened
                                    ? styles.arrowBtnOpened
                                    : styles.arrowBtnClosed
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
                            offset: [45, -50],
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
                    <CloseInput
                        className={styles.icon}
                        onClick={onCloseInput}
                    />
                </div>
            )}
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
                                key={item.field + item.type + index}
                                draggable
                                onDragStart={(e) =>
                                    onFieldDragStart(e, item.field)
                                }
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
                        setDeleteWarningModalOpened={
                            setDeleteWarningModalOpened
                        }
                        selectedTableFullName={selectedTableFullName}
                        onCloseSchemaEditorBlock={onCloseSchemaEditorBlock}
                        isDeleteWarningModalOpened={isDeleteWarningModalOpened}
                        onDeleteTable={onDeleteTable}
                        tableItem={tableItem}
                    />,
                    document.body,
                )}
        </div>
    );
};

export default SchemaEditorBlock;
