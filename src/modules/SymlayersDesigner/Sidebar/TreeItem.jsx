import PropTypes from 'prop-types';
/* eslint-disable react/jsx-wrap-multilines */
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import Tooltip from '../../../common/components/Tooltip';
import {getTableIdFromParams} from '../../../data/helpers';
import FolderIcon from '../../../layout/assets/folderIcon.svg';
import TableIcon from '../../../layout/assets/icons/viewsShow.svg';
import OpenFolderIcon from '../../../layout/assets/openFolderIcon.svg';
import styles from './Sidebar.module.scss';
import TreeTableField from './TreeTableField';

const TreeItem = ({name, isSchema, table, onSelect, isOpen}) => {
    const [isActive, setActive] = useState(false);
    const [isFolderOpen, setFolderOpen] = useState(false);
    const [event, setEvent] = useState({});

    const selectedTables = useSelector(
        (state) => state.app.schemaDesigner.selectedTables,
    );

    useEffect(() => {
        if (isOpen) setFolderOpen(true);
        else setFolderOpen(false);
    }, [isOpen]);

    const selectedTableColumns =
        selectedTables[getTableIdFromParams({...table, connect_id: 4})];

    useEffect(() => {
        if (!isSchema && isActive) {
            onSelect(table, event);
        }
        if (isSchema && isActive) {
            setTimeout(() => setActive(false), 240);
        }
    }, [isActive]);

    return (
        <>
            {isSchema ? (
                <Tooltip placement="bottomLeft" overlay={<>{name}</>}>
                    <div
                        className={
                            isActive ? styles.actTableItem : styles.tableItem
                        }
                        onClick={() => {
                            setActive(!isActive);
                            setFolderOpen(!isFolderOpen);
                        }}
                    >
                        <div>
                            {isFolderOpen ? (
                                <OpenFolderIcon />
                            ) : (
                                <FolderIcon className={styles.folderIcon} />
                            )}
                        </div>
                        <span>{name}</span>
                    </div>
                </Tooltip>
            ) : (
                <Tooltip
                    placement="bottomLeft"
                    overlay={<>{table.objectName}</>}
                >
                    <div className={isActive ? styles.actItem : styles.item}>
                        <button
                            type="button"
                            onDoubleClick={(e) => {
                                e.preventDefault();
                                setActive(!isActive);
                                setEvent(e);
                            }}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(
                                    'item',
                                    JSON.stringify(table),
                                );
                            }}
                            onDragEnd={() => {
                                if (!isActive) setActive(true);
                            }}
                        >
                            <div className={styles.icons}>
                                {!isActive && (
                                    <FolderIcon className={styles.folderIcon} />
                                )}
                                <TableIcon
                                    className={isActive && styles.iconActive}
                                />
                            </div>
                            <span>{table.objectName}</span>
                        </button>
                        {isActive && (
                            <div className={styles.tableFields}>
                                {selectedTableColumns?.map((col) => (
                                    <TreeTableField
                                        field={col}
                                        key={Math.random()}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Tooltip>
            )}
        </>
    );
};

TreeItem.propTypes = {
    name: PropTypes.string,
    isSchema: PropTypes.bool,
    table: PropTypes.object,
    onSelect: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default TreeItem;
