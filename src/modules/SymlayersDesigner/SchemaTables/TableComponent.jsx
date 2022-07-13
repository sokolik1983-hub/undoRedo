/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core';
import lodash from 'lodash';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getObjectData,
  getObjectFields
} from '../../../data/actions/schemaDesigner';
import {
  setDataList,
  clearDataList,
  setShowDataList,
  setSelectedTablesData
} from '../../../data/reducers/schemaDesigner';
import { getTableIdFromParams } from '../../../data/helpers';
import SchemaEditorBlock from '../../Symlayers/SchemaEditorBlock/index';
// import { useApplicationActions } from 'src/data/appProvider';
import { SymanticLayerContext } from './context';
import TablePreview from './TablePreview';
import { showToast } from '../../../data/actions/app';
import { TOAST_TYPE } from '../../../common/constants/common';
import {
  setObjectsConnectionsModal,
  setTablePreviewModal
} from '../../../data/actions/universes';
import { handleCheckMatch } from './helper';
import { styles } from './TableComponent.module.scss';
import { OBJECTS_CONNECTIONS_MODAL } from '../../../common/constants/popups';
import ObjectsConnectionEditor from '../ObjectsConnectionEditor';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {},
  select: {},
  selected: {
    border: '1px solid grey',
    width: '100%',
    height: '500px'
  },
  tablesList: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tableItem: {
    position: 'absolute',
    border: '1px solid grey',
    backgroundColor: '#f5f6f8'
  },
  tableContent: {
    maxHeight: 400,
    backgroundColor: '#f5f6f8',
    zIndex: 1
  },
  tableRow: {
    borderTop: '1px solid grey'
  },
  list: {
    overflowY: 'auto',
    maxHeight: '80vh'
  },
  workZone: {
    border: '1px solid grey',
    display: 'flex',
    flexWrap: 'wrap'
  },
  tableHead: {
    backgroundColor: '#d4d4d4'
  },
  tableActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tableCheckbox: {
    display: 'flex',
    alignItems: 'center',
    padding: 4
  },
  checkBox: {
    marginRight: 5
  },
  tableType: {
    alignSelf: 'end',
    fontSize: 10,
    fontStyle: 'italic',
    border: 'none',
    textAlign: 'right',
    padding: 4
  },
  tableContainer: {
    width: 330,
    height: 'auto'
  }
}));

const TableComponent = ({
  tableId,
  isShadow,
  forceUpdate,
  onCreateSynonym,
  onDeleteTable
}) => {
  const [
    { tables, linkAnchor, searchResult, focusedItem, mul },
    {
      SET_TABLE_REFS,
      SET_TABLE_POSITION,
      SET_EXPANDED,
      SET_FILTER,
      ZOOM_DEFAULT,

      startDrag,
      onStopDrag: stopDrag,

      initLink
    },
    { getTableProps, posToCoord, addLink, getTablePosition }
  ] = useContext(SymanticLayerContext);

  const {
    tableItem,
    // connect_id,
    expanded,
    position,
    filter: columnFilter,
    ...props
  } = getTableProps(tableId);

  const { selectedTables, coloredValue, showDataList } = useSelector(
    state => state.app.schemaDesigner
  );

  const isObjectsConnectionsModalOpened = useSelector(
    state => state.app.ui.modalVisible === OBJECTS_CONNECTIONS_MODAL
  );
  const links = useSelector(state => state.app.schemaDesigner.links);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCoords({ x: coords.x + 50, y: coords.y + 50 });
  }, [selectedTables]);

  // const refs = useMemo(() => tableRefs[tableId], [tableRefs, tableId]);
  // const [showSynPopup, setShowSynPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [colorValue, setColorValue] = useState('');
  const [portsRefs, setPortsRef] = useState([]);
  const [tableRefState, setTableRef] = useState([]);
  const [headerRefState, setHeaderRef] = useState(null);
  const contentScrollContainer = useRef();
  const dispatch = useDispatch();

  const connect_id = useSelector(state => state.app.data.selectedConnectorId);
  const searchMatches = item => {
    return item?.field.toLowerCase()?.includes(coloredValue.toLowerCase());
  };
  const selectedTablesData = useSelector(state => state.app.schemaDesigner.selectedTablesData);

  useEffect(() => {
    const repeat = selectedTablesData.find(table => table.objectName === tableItem.objectName );    
    const {schema, objectName} = tableItem;
    const tableName = getTableIdFromParams({schema, objectName});
    const position = getTablePosition(tableName) || {
      deltaPosition: { x: 0, y: 0 }
    };
    if (tableItem?.columns && !repeat) {
      const tempTable = {...tableItem};
      delete tempTable.table_id;
      dispatch(setSelectedTablesData({
        id: selectedTablesData.length,
        parentTable_id: null,
        sql: null,
        viewType: "Head",
        viewHeight: 200,  
        position: position.deltaPosition,
      ...tempTable}));
    }
  }, [tableItem]);

  const searchStaticMatches = item => {
    return item?.field?.toLowerCase()?.includes(colorValue.toLowerCase());
  };
  const selectedTableColumns = selectedTables[
    getTableIdFromParams({...tableItem})
  ]?.map(item => {
    return {
      ...item,
      colored: colorValue && searchStaticMatches(item)
    };
  });

  const addRefToColumns = refs => {
    setPortsRef(refs);
  };

  const addRefToHeader = ref => {
    setHeaderRef(ref);
  };

  const addRefToTable = ref => {
    setTableRef(ref);
  };

  // eslint-disable-next-line consistent-return
  const getList = obj => {
    const tableNames = Object.keys(obj);
    if (tableNames.length) {
      const list = [];
      tableNames.forEach(i => {
        const choosenItems = obj[i].reduce(
          (acc, item) =>
            searchMatches(item) && coloredValue ? [...acc, item.field] : acc,
          []
        );

        if (choosenItems.length) {
          list.push({ name: i, line: choosenItems });
        }
      });
      return list;
    }
  };

  useEffect(() => {
    if (showDataList) {
      setColorValue(coloredValue);
    }
  }, [showDataList]);

  useEffect(() => {
    if (showDataList) {
      setIsHighlighted(true);
      dispatch(setDataList(getList(selectedTables)));
      dispatch(setShowDataList());
    }
  }, [showDataList]);

  useEffect(() => {
    dispatch(getObjectFields({ ...tableItem, connect_id: 4 }));

    // .then(response => {
    //   if (response && response.success) {
    //     setColumns(response.result);
    //     setIsLoading(false);
    //   }
    // });
  }, []);

  const setExpanded = useCallback(value => SET_EXPANDED({ tableId, value }), [
    SET_EXPANDED,
    tableId
  ]);
  const setPosition = useCallback(
    value => SET_TABLE_POSITION({ tableId, value }),
    [SET_TABLE_POSITION, tableId]
  );
  const setColumnFilter = useCallback(value => SET_FILTER({ tableId, value }), [
    SET_FILTER,
    tableId
  ]);

  const [onFilter, setOnFilter] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  // const { getObjectFields, getObjectData } = useApplicationActions();
  const [tableSize, setTableSize] = useState({ width: 400, height: 100 });

  const classes = useStyles();

  useEffect(() => {
    if (!isShadow) ZOOM_DEFAULT();
  }, [isShadow, columns]);

  useMemo(() => {
    if (tableItem && tableItem.columns) {
      setColumns(tableItem.columns);
    } else {
      setIsLoading(true);
      // dispatch(getObjectData({ ...tableItem, connect_id: 4 }))
      //
      // .then(response => {
      //   if (response && response.success) {
      //     setColumns(response.result);
      //     tableItem.columns = response.result;
      //     setIsLoading(false);
      //   }
      // });
    }
  }, [tableItem]);

  const { tableRef, headerRef, ports } = useMemo(() => {
    if (!isShadow) {
      const ports = selectedTableColumns?.map((item, i) => ({
        key: item.field,
        ref: portsRefs[i]
      }));
      const value = {
        tableRef: tableRefState,
        headerRef: headerRefState,
        ports
      };
      SET_TABLE_REFS({ tableId, value });
      return value;
    }
    return {
      tableRef: React.createRef(),
      headerRef: React.createRef(),
      ports: []
    };
  }, [isShadow, columns, portsRefs]);

  const updateTableSize = () => {
    const ref = tableRef;

    if (ref && ref.current) {
      setTableSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight
      });
    }
  };

  useEffect(updateTableSize, [columns, expanded, onFilter, columnFilter]);
  useEffect(forceUpdate, [expanded, onFilter, columnFilter, forceUpdate]);

  const handlePopupShow = () => {
    dispatch(setTablePreviewModal(true));
    const {type, catalog, schema, objectName} = tableItem;
    // dispatch(getObjectData({ id: connect_id, dataType: type, catalog, schema, objectName }));
    //   .then(
    //   response => {
    //     if (response && response.success) {
    //       setTableData(response.result);
    //       setIsLoadingData(false);
    //     }
    //   }
    // );
  };

  // const handleEditPopupShow = item => () => {
  //   props.onShowLinkEdit(true);
  //   props.onNewLinkItem(item);
  // };

  const ActualPosition = (position && position.deltaPosition) || coords;

  const onTableDragStart = useCallback(
    event => {
      event.stopPropagation();
      const delta = posToCoord(event).dif(ActualPosition);
      const dragCallback = ({ state, commit }, { postition }) => {
        const res = postition.dif(state.dragState.delta);
        const value = { ...position, deltaPosition: res };
        commit('SET_TABLE_POSITION', { tableId, value });
      };
      startDrag({ event, dragCallback, extra: { delta } });
    },
    [posToCoord, startDrag]
  );

  const onFieldDragStart = (event, field, table) => {
    event.dataTransfer.setData('field', JSON.stringify(field));
    const object1 = {
      cardinality: 'one',
      object_name: `${table.schema}_${table.objectName}`,
      table_id: table.table_id,
      outerJoin: null,
      fields: [field.field]
    }
    event.dataTransfer.setData('object1', JSON.stringify(object1));
  };

  // const tryLinkEnd = ({ item, event }) => {
  //   addLink({ table: tableItem, field: item });
  //   initLink({});
  //   stopDrag(event);
  // };

  // const tryLinkStart = ({ item, event }) => {
  //   if (linkAnchor) return;
  //   const dragStopCallback = ({ state }) => {
  //     state.linkAnchor = null;
  //     state.linkDescr = null;
  //   };

  //   const dragCallback = ({ state }, { postition }) => {
  //     state.linkAnchor = postition;
  //   };

  //   initLink({
  //     descr: { table: tableItem, field: item },
  //     pos: posToCoord(event)
  //   });
  //   startDrag({ event, dragCallback, dragStopCallback });
  // };

  const onFieldDragOver = (event, field, table) => {   
    const object1 = JSON.parse(event.dataTransfer.getData('object1'));
    const object2 = {
      cardinality: 'one',
      object_name: `${table.schema}_${table.objectName}`,
      table_id: table.table_id,
      outerJoin: null,
      fields: [field.field]
    }

    if (object1.object_name !== object2.object_name)
      dispatch(setObjectsConnectionsModal(true, {id: links.length, newLink: true, object1, object2}));
    // tryLinkEnd({field, event})
  };

  const relatedSearchItems = searchResult.filter(
    elem => tableItem && elem.tableid === tableItem.id
  );

  const focusHere =
    focusedItem && tableItem && focusedItem.tableid === tableItem.id;

  const focusedTableHere = relatedSearchItems.find(
    elem => elem.type === 'table'
  );

  useEffect(() => {
    if (focusHere && contentScrollContainer && focusedItem.type === 'column') {
      const port = ports.find(column => column.key === focusedItem.name);
      if (port && port.ref.current) {
        const parentBBox = contentScrollContainer.current.getBoundingClientRect();
        const bbox = port.ref.current.getBoundingClientRect();
        if (bbox) {
          contentScrollContainer.current.scrollTop =
            (bbox.top - parentBBox.top) / mul;
        }
      }
    }
  }, [focusedItem]);

  const [synName, setSynName] = useState('');

  const handleCreateSynonym = () => {
    if (handleCheckMatch(synName)) {
      const newSynonym = lodash.cloneDeep(tableItem);
      newSynonym.parent_table = tableItem.parent_table
        ? tableItem.parent_table
        : tableItem.objectName;
      newSynonym.objectName = synName;
      newSynonym.id = null;
      onCreateSynonym(newSynonym);
    } else {
      dispatch(
        showToast(TOAST_TYPE.DANGER, 'Имя синонима введено некорректно!')
      );
    }
  };

  const [isActiveSchemaEditorBlock, setActiveSchemaEditorBlock] = useState(
    true
  );

  return (
    <g
      style={{
        transform: `translate(${ActualPosition.x}px, ${ActualPosition.y}px)`
      }}
    >
      <foreignObject
        x={0}
        y={0}
        width="1px"
        height="1px"
        id={`obj${tableItem.objectName}`}
        // width={(tableSize && `${tableSize.width + 2}px`) || '360px'}
        // height={tableSize && `${tableSize.height + 2}px`}
        style={{
          overflow: 'visible',
          outline: focusedTableHere
            ? `2px solid ${
                focusHere && focusedItem.type === 'table' ? 'orange' : 'yellow'
              }`
            : undefined
        }}
      >
        {isActiveSchemaEditorBlock && (
          <SchemaEditorBlock
            isHighlight={isHighlighted}
            tableId={tableId}
            onTableDragStart={onTableDragStart}
            onFieldDragStart={onFieldDragStart}
            onFieldDragOver={onFieldDragOver}
            selectedTableColumns={selectedTableColumns}
            selectedTableName={tableItem.objectName}
            selectedTableFullName={`${tableItem.schema}_${tableItem.objectName}_${tableItem.id}_${connect_id}`}
            addRefToColumns={addRefToColumns}
            addRefToTable={addRefToTable}
            addRefToHeader={addRefToHeader}
            onTablePreviewClick={handlePopupShow}
            onCloseSchemaEditorBlock={setActiveSchemaEditorBlock}
            onDeleteTable={onDeleteTable}
            tableItem={tableItem}
            onCreate={handleCreateSynonym}
            synoName={synName}
            forceUpdate={forceUpdate}
            setSynoName={setSynName}
            isShadow={isShadow}
            columns={columns}
            setTablesRefs={SET_TABLE_REFS}
          />
        )}
        {isObjectsConnectionsModalOpened && (
          <ObjectsConnectionEditor
            id={links.length}
            visible={isObjectsConnectionsModalOpened && true}
          />
        )}
      </foreignObject>
      {/* <div
          className={`${classes.tableItem} unselectable`}
          style={{ margin: 0, display: 'flex', flexDirection: 'column' }}
          ref={tableRef}
        >
          <div
            className={classes.tableHead}
            ref={headerRef}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                flexGrow: '1'
              }}
            >
              <div
                onMouseDown={event => {
                  if (event.button !== 0) return;
                  onTableDragStart(event);
                }}
              >
                <DragIndicatorIcon
                  className="handle"
                  style={{
                    marginTop: 5,
                    marginRight: 15,
                    fontSize: 30,
                    cursor: 'move'
                  }}
                />
              </div>
              <div>
                <Typography variant="h6">
                  <b
                    style={{ cursor: 'grab' }}
                    onMouseDown={ev => {
                      ev.target.style.cursor = 'grabbing';
                      if (ev.button !== 0) return;
                      ev.stopPropagation();
                    }}
                    onMouseLeave={ev => {
                      ev.target.style.cursor = 'grab';
                    }}
                    onMouseUp={ev => {
                      ev.target.style.cursor = 'grab';
                    }}
                    onDragStart={ev => {
                      ev.stopPropagation();
                      ev.dataTransfer.setData(
                        'text',
                        JSON.stringify({
                          table: { ...tableItem },
                          tableFields: [...columns]
                        })
                      );
                    }}
                    draggable
                  >
                    {tableItem && tableItem.object_name}
                  </b>
                </Typography>
              </div>
            </div>
            <div className={classes.tableActions}>
              {' '}
              <Tooltip title="Создать синоним" placement="top">
                <IconButton
                  aria-label="create-link"
                  style={{ padding: 2 }}
                  onClick={() => setShowSynPopup(true)}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={onFilter ? 'скрыть фильтр' : 'открыть фильтр'}
                placement="top"
              >
                <IconButton
                  aria-label="filter_alt"
                  style={{ padding: 2 }}
                  onClick={() => {
                    setOnFilter(!onFilter);
                  }}
                >
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Просмотр" placement="top">
                <IconButton aria-label="show-content" style={{ padding: 2 }}>
                  <PageviewIcon onClick={handlePopupShow} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={expanded ? 'Свернуть' : 'Развернуть'}
                placement="top"
              >
                <IconButton
                  aria-label="show-content"
                  style={{ padding: 2 }}
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить" placement="top">
                <IconButton
                  aria-label="show-content"
                  style={{ padding: 2 }}
                  onClick={() => {
                    // onDeleteTable(tableItem);
                    setShowDeleteConfirmation(tableItem);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div
            className={classes.tableContent}
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'visible',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch'
            }}
            onScroll={forceUpdate}
            ref={contentScrollContainer}
          >
            {isLoading && <LinearProgress />}
            {expanded && columns && (
              <Table size="small" dense="true" className="unselectable">
                <TableBody>
                  {onFilter && (
                    <TableCell colSpan={2} key="filterLine">
                      <TextField
                        margin="none"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={columnFilter}
                        type="text"
                        placeholder="Фильтрация по имени"
                        onChange={event => {
                          setColumnFilter(event.target.value.toUpperCase());
                        }}
                      />
                    </TableCell>
                  )}
                  {columns
                    .filter(
                      item =>
                        !columnFilter ||
                        (item.field &&
                          item.field.toUpperCase().indexOf(columnFilter)) !== -1
                    )
                    .map((item, idx) => {
                      const port =
                        ports.find(column => column.key === item.field) || {};

                      return (
                        <TableRow
                          className={`table-row${
                            focusHere &&
                            focusedItem.type === 'column' &&
                            focusedItem.name === item.field
                              ? ' focused-table-row'
                              : relatedSearchItems.find(
                                  searchItem =>
                                    searchItem.type === 'column' &&
                                    searchItem.name === item.field
                                )
                              ? ' higlited-table-row'
                              : ''
                          }`}
                          style={{
                            cursor: 'grab'
                          }}
                          ref={port.ref}
                          key={item.field + idx}
                          onMouseLeave={ev => (ev.target.style.cursor = 'grab')}
                          {...(props.isDataLayer
                            ? {
                                onDragStart: ev => {
                                  ev.dataTransfer.setData(
                                    'text',
                                    JSON.stringify({
                                      table: { ...tableItem },
                                      selected: { ...item }
                                    })
                                  );
                                },
                                draggable: true,
                                onMouseUp: ev => {
                                  ev.target.style.cursor = 'grab';
                                  if (ev.button !== 0) return;
                                  ev.stopPropagation();
                                },
                                onMouseDown: ev => {
                                  ev.target.style.cursor = 'grabbing';
                                  if (ev.button !== 0) return;
                                  ev.stopPropagation();
                                }
                              }
                            : {
                                onMouseUp: ev => {
                                  ev.target.style.cursor = 'grab';
                                  if (ev.button !== 0) return;
                                  ev.stopPropagation();
                                  tryLinkEnd({ tableId, item, event: ev });
                                },
                                onMouseDown: ev => {
                                  ev.target.style.cursor = 'grabbing';
                                  if (ev.button !== 0) return;
                                  ev.stopPropagation();

                                  // const tableRect = tableRef.current.getBoundingClientRect()
                                  // const rect = port.ref.current.getBoundingClientRect()
                                  // const [width, height] = [port.ref.current.clientWidth, port.ref.current.clientHeight]
                                  // const x = (rect.x - tableRect.x) * height / rect.height
                                  // const y = (rect.y - tableRect.y) * width / rect.width

                                  tryLinkStart({ tableId, item, event: ev });
                                }
                              })}
                          onDragStart={ev => {
                            ev.dataTransfer.setData(
                              'text',
                              JSON.stringify({
                                table: { ...tableItem },
                                selected: { ...item }
                              })
                            );
                          }}
                        >
                          <TableCell className={classes.tableCheckbox}>
                            <b>{item.field}</b>
                          </TableCell>
                          <TableCell className={classes.tableType}>
                            {item.type[0].toUpperCase()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </div>
        </div> */}
      {/* {showSynPopup && (
          <Dialog
            open={showSynPopup}
            onClose={() => setShowSynPopup(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Создать синоним</DialogTitle>
            <DialogContent>
              <TextField
                value={synName}
                variant="outlined"
                fullWidth
                onChange={ev => {
                  // const reg = /[^A-Za-z0-9]+/g;
                  // if (!ev.target.value.match(reg)) {
                  setSynName(ev.target.value.replaceAll(' ', '_'));
                  // }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateSynonym}>Создать</Button>
              <Button
                onClick={() => {
                  setShowSynPopup(false);
                  setSynName('');
                }}
              >
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {showDeleteConfirmation && (
          <Dialog
            open={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Удаление таблицы</DialogTitle>
            <DialogContent>
              <Typography>
                Будет удалена таблица и все связи с этой таблицой, включая
                объекты. Вы уверены?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onDeleteTable(showDeleteConfirmation);
                  setShowDeleteConfirmation(false);
                }}
              >
                Подтвердить
              </Button>
              <Button onClick={() => setShowDeleteConfirmation(false)}>
                Отмена
              </Button>
            </DialogActions>
          </Dialog>
        )} */}
    </g>
  );
};

export default TableComponent;
