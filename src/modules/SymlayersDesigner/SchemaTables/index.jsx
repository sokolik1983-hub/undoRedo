import MapIcon from '@material-ui/icons/Map';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import lodash from 'lodash';
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../../../common/components/IconButton';
import Tooltip from '../../../common/components/Tooltip/index';
import { setObjectsConnectionsModal } from '../../../data/actions/universes';
import { getTableIdFromParams } from '../../../data/helpers';
// import SearchDialog from './SearchDialog';
import {
  setLoadedUniverse,
  setTablesCoord,
} from '../../../data/reducers/schemaDesigner';
import Minus from '../../../layout/assets/reportDesigner/minus.svg';
import Plus from '../../../layout/assets/reportDesigner/plus.svg';
import { SymanticLayerContext, SymanticLayerContextProvider } from './context';
import SymanticLink from './Link';
import Minimap from './Minimap';
import RNDZone from './RNDZone';
import styles from './SchemaTables.module.scss';
import useStyles from './style';
import Table from './TableComponent';
// import SearchDialog from './SearchDialog';
import Vector from './vector';

// import {
//   useApplicationActions,
//   useApplicationState
// } from 'src/data/appProvider';

const Provided = (props) => {
  const [lastUpdTime, forceUpdate] = useReducer(() => new Date(), 0);
  const tablesPosition = useSelector(
    (state) => state.app.schemaDesigner.tablesRefCoord,
  );
  const dispatch = useDispatch();
  const [addCord, setAddCoord] = useState(0);
  const selectedTablesData = useSelector(
    (state) => state.app.schemaDesigner.selectedTablesData,
  );
  const selectedTables = useSelector(
    (state) => state.app.schemaDesigner.selectedTables,
  );

  const isUnvLoaded = useSelector(
    (state) => state.app.schemaDesigner.isUnvLoaded,
  );
  // const saveUserData = {};
  // const userData = {};
  // const { saveUserData } = useApplicationActions();
  // const { userData = {} } = useApplicationState();
  const [
    {
      workAreaRef,
      tables,
      getTableId,
      linkAnchor,
      linkDescr,
      showMinimap,
      searchPopupVisible,
      focusedItem,
      mul,
    },
    {
      SET_SHOW_MINIMAP,
      ZOOM_DEFAULT: handleZoomDefault,
      ZOOM_AROUND_CENTER: handleZoomCenter,
      SET_TABLES_POSTION: setTablesPosition,
      SET_TABLES_POSITION_CHANGED_CALLBACK: setTablePositionChangedCallback,
      SET_TABLES: setTables,
      SET,
      SET_POSITION,
      SET_SEARCH_POPUP_VISIBLE,
    },
    { getRefs, getTablePosition, posToCoord },
  ] = useContext(SymanticLayerContext);
  const classes = useStyles();

  useEffect(() => {
    if (focusedItem) {
      const table = Object.values(tables).find(
        (item) => item.id === focusedItem.tableid,
      );
      const tableName = getTableId(table);
      const tp = getTablePosition(tableName) || {
        deltaPosition: { x: 0, y: 0 },
      };
      const tr = getRefs(tableName);
      const tableRect = (tr.tableRef.current &&
        tr.tableRef.current.getBoundingClientRect()) || { width: 0, height: 0 };

      const position = Vector.new(
        tp.deltaPosition.x + tableRect.width / 2 / mul,
        tp.deltaPosition.y + tableRect.height / 2 / mul,
      );

      SET_POSITION(position);
    }
  }, [focusedItem]);

  const toggleSearchPopup = () => {
    SET_SEARCH_POPUP_VISIBLE(!searchPopupVisible);
  };

  useEffect(() => {
    function handler(event) {
      if (
        event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        event.code === 'KeyF'
      ) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        toggleSearchPopup();
      }
    }

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [searchPopupVisible]);

  useMemo(() => {
    SET({ key: 'connect_id', value: props.connect_id });
  }, [props.connect_id]);
  useMemo(() => {
    SET({ key: 'onShowLinkEdit', value: props.onShowLinkEdit });
  }, [props.onShowLinkEdit]);
  useMemo(() => {
    SET({ key: 'onSelectField', value: props.onSelectField });
  }, [props.onSelectField]);
  useMemo(() => {
    SET({ key: 'checkedFields', value: props.checkedFields });
  }, [props.checkedFields]);
  useMemo(() => {
    SET({ key: 'onChangePosition', value: props.onChangePosition });
  }, [props.onChangePosition]);
  useMemo(() => {
    SET({ key: 'isDataLayer', value: props.isDataLayer });
  }, [props.isDataLayer]);
  useMemo(() => {
    SET({ key: 'onShowLinkEdit', value: props.onShowLinkEdit });
  }, [props.onShowLinkEdit]);
  useMemo(() => {
    SET({ key: 'onNewLinkItem', value: props.onNewLinkItem });
  }, [props.onNewLinkItem]);

  useEffect(() => {
    setTimeout(() => handleZoomDefault(), 500); // знаю что костыль -- гоните меня, насмехайтесь надо мной
  }, []);

  // useMemo(() => {
  //       const tablePositions = {};
  //       setAddCoord(addCord+50);
  //       tablesPosition?.forEach(tablePosit => {
  //         for (let key in tablePosit) {
  //           const delta = posToCoord(tablePosit[key]).dif({x: 20 + addCord, y: 40 + addCord});
  //           tablePositions[key] = {deltaPosition: delta};
  //         }
  //       });
  //       console.log(tablePositions)
  //       setTablesPosition(tablePositions);
  //   }, [tablesPosition]);

  useEffect(() => {
    if (selectedTablesData.length) {
      forceUpdate();
      setTables(selectedTablesData);
    } else if (!props.tables.length) {
      setTables([]);
    }
  }, [selectedTablesData]);

  useMemo(() => {
    const tablePositions = {};
    for (let key in selectedTables) {
      if (selectedTables[key]?.position?.deltaPosition) {
        tablePositions[key] = {
          deltaPosition: selectedTables[key].position.deltaPosition,
        };
      }
    }
    tablesPosition?.forEach((tablePosit) => {
      const lastTableNum = selectedTablesData.length - 1;
      const lastDelta =
        selectedTablesData[lastTableNum]?.position?.deltaPosition || null;
      for (let key in tablePosit) {
        let delta = { x: 0, y: 0 };
        if (lastDelta) {
          delta = { x: lastDelta.x, y: lastDelta.y };
          setAddCoord(lastDelta.x + 70);
        } else {
          delta = posToCoord(tablePosit[key]).dif({
            x: 20 + addCord,
            y: 40 + addCord,
          });
          setAddCoord(addCord + 70);
        }
        tablePositions[key] = { deltaPosition: delta };
      }
    });
    if (!lodash.isEmpty(tablePositions)) {
      setTablesPosition(tablePositions);
      dispatch(setLoadedUniverse(true));
    }
  }, [selectedTablesData, tablesPosition]);

  useEffect(() => {
    if (props.tables.length) {
      setTables([...selectedTablesData, ...props.tables]);
      lodash.keys(props.tablesPosition).forEach((key) => {
        if (
          !lodash.find(
            props.tables,
            (table) => `${table.schema}.${table.objectName}` === key,
          )
        ) {
          delete props.tablesPosition[key];
        }
      });
    } else if (!selectedTablesData.length) {
      setTables([]);
    }
  }, [props.tables]);

  const renderZoomBtn = () => (
    <div
      key="scalePanel"
      style={{
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 15,
      }}
    >
      {/* <Tooltip title="поиск по семантическому слою"> */}
      {/*   <IconButton onClick={() => toggleSearchPopup()}> */}
      {/*     <SearchIcon /> */}
      {/*   </IconButton> */}
      {/* </Tooltip> */}
      <Tooltip overlay={`${showMinimap ? 'скрыть' : 'показать'} миникарту`}>
        <IconButton onClick={() => SET_SHOW_MINIMAP(!showMinimap)}>
          <MapIcon />
        </IconButton>
      </Tooltip>
      <Tooltip overlay="масштаб всего семантического слоя">
        <IconButton onClick={handleZoomDefault}>
          <ZoomOutMapIcon />
        </IconButton>
      </Tooltip>
      <Tooltip overlay="отдалить">
        <IconButton
          onClick={
            mul < 0.10881882041201538 ? null : () => handleZoomCenter(-100)
          }
        >
          <Minus />
        </IconButton>
      </Tooltip>
      <Tooltip overlay="приблизить">
        <IconButton onClick={mul <= 1.9 ? () => handleZoomCenter(+100) : null}>
          <Plus />
        </IconButton>
      </Tooltip>
    </div>
  );

  const targetRect = (table, field) => {
    const { schema, objectName } = table;
    const tableName = getTableIdFromParams({ schema, objectName });
    const tp = getTablePosition(tableName) || {
      deltaPosition: { x: 0, y: 0 },
    };
    const tr = getRefs(getTableIdFromParams({ schema, objectName }));

    if (!tp || !tr || !tr.tableRef || !tr.headerRef) return { tp, tr };

    let port = tr.ports.find((column) => column.key === field);

    if (!port) port = tr.headerRef;
    else port = port.ref;

    const headerRect =
      tr.headerRef.current && tr.headerRef.current.getBoundingClientRect();
    const tableRect =
      tr.tableRef.current && tr.tableRef.current.getBoundingClientRect();
    let rect = port.current && port.current.getBoundingClientRect();

    if (!rect) {
      rect = headerRect || tableRect;
      port = tr.headerRef || tr.tableRef;
    }
    if (
      tableRect &&
      rect &&
      (rect.y <= tableRect.y || rect.y > tableRect.y + tableRect.height - 30)
    ) {
      port = tr.headerRef;
      rect = port.current && port.current.getBoundingClientRect();
    }

    if (!tableRect || !rect) {
      return { tp, tr, port, tableRect, rect };
    }

    const [width, height] = [
      port.current.clientWidth,
      port.current.clientHeight,
    ];

    const x =
      ((rect.x - tableRect.x) * height) / rect.height + tp.deltaPosition.x;
    const y =
      ((rect.y - tableRect.y) * height) / rect.height + tp.deltaPosition.y;

    return {
      portRect: {
        x,
        y,
        // width,
        width: tr.tableRef.current.clientWidth,
        height,
      },
      tableRect,
    };
  };

  const handleEdit = (id) => {
    const result = props.objectsLinks.filter((l) => {
      return l.id === id;
    });
    dispatch(setObjectsConnectionsModal(true, ...result));
  };

  const createObjectName = (id) => {
    const finded = selectedTablesData?.find((tableData) => tableData.id === id);
    const schema = finded?.schema;
    const objectName = finded?.objectName;
    const objectFullName = `${schema}_${objectName}`;
    return objectFullName;
  };

  const links = useSelector((state) => state.app.schemaDesigner.links);
  const renderContent = ({ isShadow = false } = {}) => {
    return (
      <React.Fragment key="content">
        {linkAnchor &&
          (() => {
            const SourceRect = (linkDescr.table, linkDescr.field);
            const pseudoRect = {
              x: linkAnchor.x,
              y: linkAnchor.y - 10,
              width: 0,
              height: 20,
            };
            const TargetRect = {
              portRect: pseudoRect,
              tableRect: pseudoRect,
            };

            return (
              <SymanticLink
                key="new_link"
                TargetRect={TargetRect}
                SourceRect={SourceRect}
              />
            );
          })()}
        {links.map((link) => {
          const objectFullName1 = createObjectName(link.object1.table_id);
          const objectFullName2 = createObjectName(link.object2.table_id);
          let objectTable1 = Object.values(tables)?.find(
            (table) =>
              `${table.schema}_${table.objectName}` === objectFullName1,
          );
          let objectTable2 = Object.values(tables)?.find(
            (table) =>
              `${table.schema}_${table.objectName}` === objectFullName2,
          );
          let SourceRect;
          let TargetRect;
          if (objectTable1 && objectTable2) {
            console.log('A');
            SourceRect = targetRect(
              objectTable1,
              !isShadow && link.object1.fields[0]?.field,
            );
            TargetRect = targetRect(
              objectTable2,
              !isShadow && link.object2.fields[0]?.field,
            );
          } else if (selectedTablesData.length) {
            console.log('B');
            objectTable1 = selectedTablesData.find(
              (table) =>
                `${table.schema}_${table.objectName}` === objectFullName1,
            );
            objectTable2 = selectedTablesData.find(
              (table) =>
                `${table.schema}_${table.objectName}` === objectFullName2,
            );
            SourceRect = targetRect(
              objectTable1,
              !isShadow && link.object1.fields[0]?.field,
            );
            TargetRect = targetRect(
              objectTable2,
              !isShadow && link.object2.fields[0]?.field,
            );
          }
          return (
            <SymanticLink
              link={link}
              TargetRect={TargetRect}
              SourceRect={SourceRect}
              handleEdit={handleEdit}
              key={`${objectFullName1}-${objectFullName2}${Math.random()}}`}
              // isLoop={getTableId(link.object1) === getTableId(link.object2)}
              // onCreateSynonym={props.onCreateSynonym}
              isLoop={
                objectTable1 &&
                objectTable2 &&
                getTableId(objectTable1) === getTableId(objectTable2)
              }
            />
          );
        })}
        {Object.keys(tables)?.map((tableId) => {
          return (
            <Table
              tableId={tableId}
              key={tableId}
              isShadow={isShadow}
              forceUpdate={forceUpdate}
              onCreateSynonym={props.onCreateSynonym}
              onDeleteTable={props.onDeleteTable}
            />
          );
        })}
      </React.Fragment>
    );
  };
  const [minimapSize, setMinmapSize] = useState({
    x: 450,
    y: 300,
  });
  const [minimapPosition, setMinimapPosition] = useState({
    y: +window.innerHeight - +minimapSize.y - 10 - 100,
    x: 10, // +window.innerWidth - +minimapSize.x - 10 - 100
  });

  return (
    <React.Fragment key="provided">
      <div
        className={`work-area ${classes.workArea}`}
        style={{
          border: '1px solid lightgray',
          height: '100%',
          ...props.style,
        }}
        key="main"
        ref={workAreaRef}
      >
        {renderZoomBtn()}
        <RNDZone>{renderContent()}</RNDZone>
        <div className={styles.scaleValueWrapper}>
          {Math.round((mul / 1) * 100)}%
        </div>
      </div>

      {showMinimap && (
        <Minimap
          size={minimapSize}
          position={minimapPosition}
          setSize={setMinmapSize}
          setPosition={setMinimapPosition}
          // saveUserData={saveUserData}
          // symanticLayerUserData={userData.symanticLayer}
        >
          {renderContent({ isShadow: true })}
        </Minimap>
      )}
    </React.Fragment>
  );
};

function SchemaTables(props) {
  return (
    <SymanticLayerContextProvider>
      {/* <SearchDialog /> */}
      <Provided {...props} />
    </SymanticLayerContextProvider>
  );
}

export default SchemaTables;
