/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import IconButton from '../../../common/components/IconButton';
import TextInput from '../../../common/components/TextInput';
import Tooltip from '../../../common/components/Tooltip';
import {setCreateObjectModal} from '../../../data/actions/universes';
import {
    setColoredValue,
    setShowDataList,
} from '../../../data/reducers/schemaDesigner';
import OwnerIcon from '../../../layout/assets/icons/ownerIcon.svg';
import SearchIcon from '../../../layout/assets/icons/search.svg';
import AddTableIcon from '../../../layout/assets/icons/tablesAdd.svg';
import SaveIcon from '../../../layout/assets/icons/tableSave.svg';
import FiltersIcon from '../../../layout/assets/icons/tablesFilters.svg';
import UnknownItemIcon from '../../../layout/assets/icons/unknownTypeIcon.svg';
import ViewsIcon from '../../../layout/assets/icons/viewsShow.svg';
import Magnifier from '../../../layout/assets/magnifier.svg';
import FolderIcon from '../../../layout/assets/openFolderIcon.svg';
import AttrIcon from '../../../layout/assets/queryPanel/attributeIcon.svg';
import GaugeIcon from '../../../layout/assets/queryPanel/gauge_icon.svg';
import MeasIcon from '../../../layout/assets/queryPanel/measurementIcon.svg';
import HierTreeView from './HierTreeView';
import ObjectLayer from './ObjectLayer';
import styles from './Sidebar.module.scss';

function Sidebar({onSelect}) {
    const {selectedTables, coloredValue, dataList} = useSelector(
        (state) => state.app.schemaDesigner,
    );

    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [showingDataList, setShowingDataList] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [searchMod, setSearchMod] = useState(false);
    const [searchObjectMod, setSearchObjectMod] = useState(false);
    const [selectedSchemes, setSelectedSchemes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [tables, setTables] = useState(selectedTables);
    const [selectObjectLayer, setSelectObjectLayer] = useState('');
    const [filterObjectsMode, setFilterObjectMode] = useState(null);

    const connectorObjects = useSelector(
        (state) => state.app.schemaDesigner.connectorObjects,
    );

    const objectsLayers = useSelector(
        (state) => state.app.schemaDesigner.objectsLayerList,
    );
    const [objectsList, setObjectsList] = useState([]);

    useEffect(() => {
        if (objectsLayers.length) {
            setObjectsList(objectsLayers);
            setFilterObjectMode(null);
        }
    }, [objectsLayers]);

    const handleSelectObjectLayer = (id) => {
        setSelectObjectLayer(id);
        if (id === selectObjectLayer) {
            setSelectObjectLayer('');
        }
    };

    const handleCollapse = () => {
        setCollapsed((prev) => !prev);
    };

    const handleSelectTab = (value) => () => {
        setActiveTab(value);
    };

    const handleObjectDrop = () => {
        dispatch(setCreateObjectModal(true));
    };

    useEffect(() => {
        if (!selectedTables.length) {
            setTables([]);
        }
        setTables(selectedTables);
    }, [selectedTables]);

    const handleShowDataList = (event) => {
        if (event.key === 'Enter' && coloredValue.length) {
            event.preventDefault();
            dispatch(setShowDataList());
            setShowingDataList(true);
        } else if (event.key === 'Enter') {
            dispatch(setShowDataList());
            setShowingDataList(false);
        }
    };

    const searchTable = (event) => {
        if (event.key === 'Enter' && searchValue.length) {
            let result = JSON.parse(
                JSON.stringify(
                    connectorObjects.filter((connector) =>
                        connector.object_name
                            .toUpperCase()
                            .includes(searchValue.toUpperCase()),
                    ),
                ),
            );
            result = result.map((item) => {
                item.opened = true;
                return item;
            });
            setSelectedSchemes(result);
        } else if (event.key === 'Enter') {
            setSelectedSchemes([]);
        }
    };

    const searchObject = (event) => {
        if (event.key === 'Enter' && searchValue.length) {
            const result = JSON.parse(
                JSON.stringify(
                    objectsLayers.filter((object) =>
                        object.name
                            .toUpperCase()
                            .includes(searchValue.toUpperCase()),
                    ),
                ),
            );
            setObjectsList(result);
        } else if (event.key === 'Enter') {
            setObjectsList(objectsLayers);
        }
    };

    return (
        <div>
            <div className={styles.root}>
                <div className={styles.tabs}>
                    <div
                        className={clsx(
                            styles.tab,
                            styles.tabTable,
                            activeTab === 0
                                ? styles.activeTabTable
                                : styles.notActiveTabTable,
                        )}
                        onClick={handleSelectTab(0)}
                    >
                        {activeTab === 0 && (
                            <span className={styles.tabDescr}>
                                дизайнер схемы данных
                            </span>
                        )}
                        Таблицы
                        <div className={styles.iconTableWrap}>
                            {activeTab === 0 && <SaveIcon />}
                        </div>
                    </div>
                    <div
                        className={clsx(
                            styles.tab,
                            styles.tabObject,
                            activeTab === 1 && styles.activeTabObject,
                            activeTab === 0 && styles.notActiveTabObject,
                        )}
                        onClick={handleSelectTab(1)}
                    >
                        {activeTab === 1 && (
                            <span className={styles.tabDescr}>
                                дизайнер семантического слоя
                            </span>
                        )}
                        Объекты
                        <div className={styles.iconObjectWrap}>
                            {activeTab === 1 && <SaveIcon />}
                        </div>
                    </div>
                </div>
                {!collapsed && (
                    <div className={styles.content}>
                        {activeTab === 0 ? (
                            <>
                                <div className={styles.tableActions}>
                                    <div
                                        onClick={() => setSearchMod(!searchMod)}
                                    >
                                        <Tooltip
                                            placement="rightBottom"
                                            overlay="Поиск по таблицам на схеме"
                                        >
                                            <AddTableIcon />
                                        </Tooltip>
                                    </div>
                                    <div className={styles.search}>
                                        <TextInput
                                            className={styles.searchInput}
                                            onKeyPress={(event) =>
                                                searchMod
                                                    ? handleShowDataList(event)
                                                    : searchTable(
                                                          event,
                                                          searchValue,
                                                      )
                                            }
                                            value={
                                                searchMod
                                                    ? coloredValue
                                                    : searchValue
                                            }
                                            onChange={(event) => {
                                                if (searchMod) {
                                                    dispatch(
                                                        setColoredValue(
                                                            event.target.value,
                                                        ),
                                                    );
                                                } else {
                                                    setSearchValue(
                                                        event.target.value,
                                                    );
                                                }
                                            }}
                                        />
                                        <Magnifier
                                            className={styles.magnifier}
                                            onClick={() => {
                                                if (searchMod) {
                                                    dispatch(setShowDataList());
                                                    setShowingDataList(true);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className={styles.tableFilters}>
                                        <ViewsIcon />
                                        <FiltersIcon />
                                    </div>
                                </div>
                                <div className={styles.owner}>
                                    <OwnerIcon />
                                    <span>Owner</span>
                                </div>
                                <div className={styles.contentData}>
                                    {searchMod ? (
                                        dataList.map((i) => (
                                            <div>
                                                <div
                                                    className={
                                                        styles.listItemWrapper
                                                    }
                                                >
                                                    <div>
                                                        <ViewsIcon />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.listItemName
                                                        }
                                                    >
                                                        {i.name}
                                                    </div>
                                                </div>
                                                {i.line.map((el) => (
                                                    <div
                                                        className={
                                                            styles.listItemFieldWrapper
                                                        }
                                                    >
                                                        <UnknownItemIcon />
                                                        <div
                                                            className={
                                                                styles.listItemField
                                                            }
                                                        >
                                                            {el}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        <HierTreeView
                                            data={
                                                selectedSchemes.length
                                                    ? selectedSchemes
                                                    : connectorObjects
                                            }
                                            onSelect={onSelect}
                                            isOpen={!!selectedSchemes?.length}
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <div
                                className={styles.contentObj}
                                onDrop={(e) => {
                                    if (e.dataTransfer.getData('field'))
                                        handleObjectDrop(
                                            JSON.parse(
                                                e.dataTransfer.getData('field'),
                                            ),
                                            e,
                                        );
                                }}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className={styles.objectsActions}>
                                    <div className={styles.search}>
                                        <TextInput
                                            className={
                                                styles.searchInputObjects
                                            }
                                            onKeyPress={searchObject}
                                            value={searchValue}
                                            onChange={(event) =>
                                                setSearchValue(
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <Magnifier
                                            className={styles.magnifier}
                                            onClick={searchObject}
                                        />
                                    </div>
                                    <div className={styles.objectsFilters}>
                                        <IconButton
                                            active={
                                                filterObjectsMode === 'GAUGE'
                                            }
                                            size="small"
                                            icon={<GaugeIcon />}
                                            onClick={() => {
                                                if (
                                                    filterObjectsMode ===
                                                    'GAUGE'
                                                ) {
                                                    setFilterObjectMode(null);
                                                } else
                                                    setFilterObjectMode(
                                                        'GAUGE',
                                                    );
                                            }}
                                        />
                                        <IconButton
                                            active={
                                                filterObjectsMode === 'ATTR'
                                            }
                                            size="small"
                                            icon={<AttrIcon />}
                                            onClick={() => {
                                                if (
                                                    filterObjectsMode === 'ATTR'
                                                ) {
                                                    setFilterObjectMode(null);
                                                } else
                                                    setFilterObjectMode('ATTR');
                                            }}
                                        />
                                        <IconButton
                                            active={
                                                filterObjectsMode === 'MEAS'
                                            }
                                            size="small"
                                            icon={<MeasIcon />}
                                            onClick={() => {
                                                if (
                                                    filterObjectsMode === 'MEAS'
                                                ) {
                                                    setFilterObjectMode(null);
                                                } else
                                                    setFilterObjectMode('MEAS');
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.owner}>
                                    <FolderIcon />
                                    <span>Новый семантический слой</span>
                                </div>
                                <div className={styles.contentData}>
                                    <div className={styles.objectsData}>
                                        {objectsList?.map((object) => {
                                            if (
                                                filterObjectsMode === 'GAUGE' &&
                                                object.objectType ===
                                                    'Показатель'
                                            )
                                                return (
                                                    <ObjectLayer
                                                        active={
                                                            selectObjectLayer ===
                                                            object.id
                                                        }
                                                        onSelect={
                                                            handleSelectObjectLayer
                                                        }
                                                        field={object}
                                                    />
                                                );
                                            if (
                                                filterObjectsMode === 'MEAS' &&
                                                object.objectType ===
                                                    'Измерение'
                                            )
                                                return (
                                                    <ObjectLayer
                                                        active={
                                                            selectObjectLayer ===
                                                            object.id
                                                        }
                                                        onSelect={
                                                            handleSelectObjectLayer
                                                        }
                                                        field={object}
                                                    />
                                                );
                                            if (
                                                filterObjectsMode === 'ATTR' &&
                                                object.objectType === 'Атрибут'
                                            )
                                                return (
                                                    <ObjectLayer
                                                        active={
                                                            selectObjectLayer ===
                                                            object.id
                                                        }
                                                        onSelect={
                                                            handleSelectObjectLayer
                                                        }
                                                        field={object}
                                                    />
                                                );
                                            if (!filterObjectsMode)
                                                return (
                                                    <ObjectLayer
                                                        active={
                                                            selectObjectLayer ===
                                                            object.id
                                                        }
                                                        onSelect={
                                                            handleSelectObjectLayer
                                                        }
                                                        field={object}
                                                    />
                                                );
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
