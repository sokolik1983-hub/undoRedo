/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable */
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import lodash from 'lodash';
import styles from './SchemaTables.module.scss'
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import MapIcon from '@material-ui/icons/Map';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '../../../common/components/IconButton'
import Tooltip from '../../../common/components/Tooltip/index';
import { ReactComponent as Plus } from '../../../layout/assets/reportDesigner/plus.svg';
import { ReactComponent as Minus } from '../../../layout/assets/reportDesigner/minus.svg';

import { SymanticLayerContextProvider, SymanticLayerContext } from './context';

// import {
//   useApplicationActions,
//   useApplicationState
// } from 'src/data/appProvider';

import RNDZone from './RNDZone';

import useStyles from './style';

import Table from './TableComponent';
import SymanticLink from './Link';
import Minimap from './Minimap';
// import SearchDialog from './SearchDialog';
import Vector from './vector';

const Provided = props => {
  const [lastUpdTime, forceUpdate] = useReducer(() => new Date(), 0);

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
      mul
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
      SET_SEARCH_POPUP_VISIBLE
    },
    { getRefs, getTablePosition }
  ] = useContext(SymanticLayerContext);
  const classes = useStyles();

  useEffect(() => {
    if (focusedItem) {
      const table = Object.values(tables).find(
        item => item.id === focusedItem.tableid
      );
      const tableName = getTableId(table);
      const tp = getTablePosition(tableName) || {
        deltaPosition: { x: 0, y: 0 }
      };
      const tr = getRefs(tableName);
      const tableRect = (tr.tableRef.current &&
        tr.tableRef.current.getBoundingClientRect()) || { width: 0, height: 0 };

      const position = Vector.new(
        tp.deltaPosition.x + tableRect.width / 2 / mul,
        tp.deltaPosition.y + tableRect.height / 2 / mul
      );

      // console.log('reposition', focusedItem, table, tp, tableRect, '->', position)
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

  useMemo(() => {
    if (props.tablesPosition) {
      setTablesPosition(props.tablesPosition);
      setTablePositionChangedCallback(props.setTablesPosition);
    }
  }, [props.tablesPosition]);

  useMemo(() => {
    if (props.tables) {
      setTables(props.tables);

      lodash.keys(props.tablesPosition).forEach(key => {
        if (
          !lodash.find(
            props.tables,
            table => `${table.schema}.${table.object_name}` === key
          )
        ) {
          delete props.tablesPosition[key];
        }
      });
    } else {
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
        zIndex: 15
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
    const tableName = getTableId(table);
    const tp = getTablePosition(tableName) || { deltaPosition: { x: 0, y: 0 } };
    const tr = getRefs(tableName);

    if (!tp || !tr || !tr.tableRef || !tr.headerRef) return { tp, tr };

    let port = tr.ports.find(column => column.key === field.field);

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
      (rect.y < tableRect.y || rect.y > tableRect.y + tableRect.height)
    ) {
      port = tr.headerRef;
      rect = port.current && port.current.getBoundingClientRect();
    }

    if (!tableRect || !rect) {
      return { tp, tr, port, tableRect, rect };
    }

    const [width, height] = [
      port.current.clientWidth,
      port.current.clientHeight
    ];
    const x =
      ((rect.x - tableRect.x) * height) / rect.height + tp.deltaPosition.x;
    const y =
      ((rect.y - tableRect.y) * height) / rect.height + tp.deltaPosition.y;

    return {
      portRect: {
        x,
        y,
        width: tr.tableRef.current.clientWidth,
        height
      },
      tableRect
    };
  };
  const renderContent = ({ isShadow = false } = {}) => {
    return (
      <React.Fragment key="content">
        {linkAnchor &&
          (() => {
            const SourceRect = targetRect(linkDescr.table, linkDescr.field);
            const pseudoRect = {
              x: linkAnchor.x,
              y: linkAnchor.y - 10,
              width: 0,
              height: 20
            };
            const TargetRect = {
              portRect: pseudoRect,
              tableRect: pseudoRect
            };

            return (
              <SymanticLink
                key="new_link"
                TargetRect={TargetRect}
                SourceRect={SourceRect}
              />
            );
          })()}

        {props.objectsLinks?.map(link => {
          const SourceRect = targetRect(
            link.object1.object,
            !isShadow && link.object1.fields[0]
          );
          const TargetRect = targetRect(
            link.object2.object,
            !isShadow && link.object2.fields[0]
          );

          return (
            <SymanticLink
              link={link}
              TargetRect={TargetRect}
              SourceRect={SourceRect}
              handleEdit={props.handleEdit}
              onShowLinkEdit={props.onShowLinkEdit}
              key={link}
              isLoop={
                getTableId(link.object1.object) ===
                getTableId(link.object2.object)
              }
              // onCreateSynonym={props.onCreateSynonym}
            />
          );
        })}

        {Object.keys(tables)?.map(tableId => {
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
    y: 300
  });
  const [minimapPosition, setMinimapPosition] = useState({
    y: +window.innerHeight - +minimapSize.y - 10 - 100,
    x: 10 // +window.innerWidth - +minimapSize.x - 10 - 100
  });

  return (
    <React.Fragment key="provided">
      <div
        className={`work-area ${classes.workArea}`}
        style={{ border: '1px solid lightgray', ...props.style }}
        key="main"
        ref={workAreaRef}
      >
        {renderZoomBtn()}
        <RNDZone>{renderContent()}</RNDZone>
        <div className={styles.scaleValueWrapper}>{Math.round((mul / 1) * 100)}%</div>
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
