/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash from 'lodash';

import TuneIcon from '@material-ui/icons/Tune';
import BrushIcon from '@material-ui/icons/Brush';
import ExtensionIcon from '@material-ui/icons/Extension';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ForumIcon from '@material-ui/icons/Forum';
import InfoIcon from '@material-ui/icons/Info';
// import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';

import styles from './SidePanel.module.scss';
import NavigationMenu from './NavigationMenu';
import { SIDE_PANEL_TYPES } from '../../constants/common';
import StyleFormatter from './SectionGroup/StyleFormatter';
import {
  addSortingField,
  addTableColumn,
  addTableRow,
  addTableValue,
  columnObject,
  setActiveNodes,
  setConfigPanelVisible,
  setStructure,
  setTableStyle,
  setTableVariant,
  sortingObject
} from '../../../data/reducers/reportDesigner';
import ObjectsList from './ObjectsList';
import { getCurrentReport } from '../../../modules/ReportDesigner/helpers';
import SortingField from './SortingField';
import { ReactComponent as CloseIcon } from '../../../layout/assets/close.svg';
import { TABLE_ICONS } from '../../constants/reportDesigner/reportDesignerIcons';
import { removeTableColumn } from '../../../data/reducers/new_reportDesigner';
// import { deepObjectSearch } from '../../../data/helpers';

const NAV_MENU_REPORT = [
  { id: 1, title: 'Данные', icon: <ExtensionIcon /> },
  { id: 2, title: 'Структура', icon: <AccountTreeIcon /> },
  { id: 3, title: 'Комментарии', icon: <ForumIcon /> },
  { id: 4, title: 'Экспорт', icon: <InfoIcon /> }
];

const NAV_MENU_BLOCK = [
  { id: 1, title: 'Данные', icon: <TuneIcon /> },
  // { id: 2, title: 'Filters', icon: <FilterListIcon /> },
  { id: 3, title: 'Сортировка', icon: <SortIcon /> },
  { id: 4, title: 'Форматирование', icon: <BrushIcon /> }
];

const NAV_MENU_TABLE = [
  { id: 1, title: 'Заголовок', icon: <>Заголовок</> },
  { id: 2, title: 'Ячейки', icon: <>Ячейки</> }
];

// eslint-disable-next-line react/prop-types
export default function SidePanel({ navType }) {
  const [activePage, setActivePage] = useState(1);
  const [activeSubMenu, setActiveSubMenu] = useState(1);
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const dispatch = useDispatch();

  const activeNode =
    reportDesigner.reportsData.present.activeNodes &&
    reportDesigner.reportsData.present.activeNodes[0];

  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );

  const currentNode = lodash.find(
    currentReport?.structure?.pgBody?.content?.children,
    item => item.id === activeNode?.id
  );
  const headerZone = currentNode?.content?.layout?.zones?.filter(
    item => item.vType === 'header'
  );

  function getNavMenu() {
    switch (navType) {
      case SIDE_PANEL_TYPES.CONFIG_MENU:
        return NAV_MENU_REPORT;
      case SIDE_PANEL_TYPES.BLOCK_MENU:
        return NAV_MENU_BLOCK;
      default:
        return [];
    }
  }

  function renderReportConfigContent() {
    switch (activePage) {
      case 1:
        return <ObjectsList items={currentReport?.config.objects} />;
      case 2:
        return (
          <div>
            <p>Структура</p>
            {currentReport?.structure?.map(item => (
              <p>{item.title || item.type}</p>
            ))}
          </div>
        );
      case 3:
        return <div>Комментарии</div>;
      case 4:
        return <div>Информация</div>;

      default:
        return null;
    }
  }

  function handleAddSorting() {
    const { sorting } = currentNode;

    dispatch(
      addSortingField({
        id: currentNode.id,
        sorting: [...sorting, { ...sortingObject, id: Date.now() }]
      })
    );
  }

  function handleChangeSortingField(changedItem) {
    const { sorting } = currentNode;
    dispatch(
      addSortingField({
        id: currentNode.id,
        sorting: sorting.map(item => {
          const selectedItem = lodash.cloneDeep(item);
          if (selectedItem.id === changedItem.id) {
            selectedItem.field = changedItem.field;
            selectedItem.sortingType = changedItem.sortingType;
          }

          return selectedItem;
        })
      })
    );
  }

  function handleRemoveSortingField(removingItem) {
    const { sorting } = currentNode;
    dispatch(
      addSortingField({
        id: currentNode.id,
        sorting: [...sorting.filter(item => item.id !== removingItem.id)]
      })
    );
  }

  function handleRemoveNode() {
    dispatch(
      setStructure(
        currentReport?.structure?.filter(item => item.id !== currentNode.id)
      )
    );
    dispatch(setActiveNodes([]));
    dispatch(setConfigPanelVisible(false));
  }

  const handleRemoveColumn = object => event => {
    event?.stopPropagation();

    dispatch(
      removeTableColumn({
        object
      })
    );

    // dispatch(
    //   setStructure(
    //     currentReport?.structure?.map(item => {
    //       const clone = lodash.cloneDeep(item);
    //       if (clone?.id === currentNode?.id) {
    //         clone.columns = currentNode?.columns?.filter(
    //           col => col?.object?.id !== columnId
    //         );
    //       }
    //       return clone;
    //     })
    //   )
    // );
  };
  const handleRemoveRow = rowId => event => {
    event?.stopPropagation();

    dispatch(
      setStructure(
        currentReport?.structure?.map(item => {
          const clone = lodash.cloneDeep(item);
          if (clone?.id === currentNode?.id) {
            clone.rows = currentNode?.rows?.filter(
              row => row?.object?.id !== rowId
            );
          }
          return clone;
        })
      )
    );
  };
  const handleRemoveValue = valueId => event => {
    event?.stopPropagation();

    dispatch(
      setStructure(
        currentReport?.structure?.map(item => {
          const clone = lodash.cloneDeep(item);
          if (clone?.id === currentNode?.id) {
            clone.values = currentNode?.values?.filter(
              val => val?.object?.id !== valueId
            );
          }
          return clone;
        })
      )
    );
  };

  function allowDrop(event) {
    event.preventDefault();
  }

  function refreshFieldsStore(selectedEl) {
    switch (selectedEl.source) {
      case 'columns':
        handleRemoveColumn(selectedEl.object.id)();
        break;
      case 'rows':
        handleRemoveRow(selectedEl.object.id)();
        break;
      case 'values':
        handleRemoveValue(selectedEl.object.id)();
        break;
      default:
        break;
    }
  }

  function handleDropObjectColumn(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();
    refreshFieldsStore(selectedEl);
    // dispatch(
    //   addTableColumn({
    //     column: { ...columnObject, object: { ...selectedEl } },
    //     id: currentNode?.id
    //   })
    // );
  }
  function handleDropObjectRow(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();
    refreshFieldsStore(selectedEl);

    dispatch(
      addTableRow({
        row: { ...columnObject, object: { ...selectedEl } },
        id: currentNode?.id
      })
    );
  }
  function handleDropObjectValue(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();

    refreshFieldsStore(selectedEl);
    dispatch(
      addTableValue({
        value: { ...columnObject, object: { ...selectedEl } },
        id: currentNode?.id
      })
    );
  }

  const handleSetVariant = variant => {
    dispatch(setTableVariant(variant));
  };

  function renderBlockPanelContent() {
    switch (activePage) {
      case 1:
        return (
          <div>
            <div>
              <p>Преобразовать в</p>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {TABLE_ICONS.slice(1, 4).map(i => (
                  <div
                    className={styles.icon}
                    onClick={() => handleSetVariant(i.type)}
                    key={i.text}
                  >
                    {i.icon}
                  </div>
                ))}
              </div>
            </div>
            <div
              onDrop={handleDropObjectColumn}
              onDragOver={allowDrop}
              style={{ minHeight: 100, minWidth: 100 }}
            >
              <p>Колонки</p>
              {/* TODO  headerZone */}
              {headerZone?.map(zone =>
                zone.cells?.map(object => {
                  return (
                    <p
                      className={styles.objectItem}
                      key={object.id}
                      draggable
                      onDragStart={event => {
                        event.dataTransfer.setData(
                          'text/plain',
                          JSON.stringify({
                            object,
                            source: 'columns'
                          })
                        );
                      }}
                    >
                      {object.expression.formula}
                      <CloseIcon
                        onClick={handleRemoveColumn(object)}
                        className={styles.closeIcon}
                      />
                    </p>
                  );
                })
              )}
              {/* {currentNode?.columns?.map(column => (
                <p
                  className={styles.objectItem}
                  key={column.object.id}
                  draggable
                  onDragStart={event => {
                    event.dataTransfer.setData(
                      'text/plain',
                      JSON.stringify({
                        object: column.object,
                        source: 'columns'
                      })
                    );
                  }}
                >
                  {column.object.field}
                  <CloseIcon
                    onClick={handleRemoveColumn(column.object.id)}
                    className={styles.closeIcon}
                  />
                </p>
              ))} */}
            </div>
            {/* 
            {currentNode?.variant === 'table_cross' && (
              <>
                <div
                  onDrop={handleDropObjectRow}
                  onDragOver={allowDrop}
                  style={{ minHeight: 100, minWidth: 100 }}
                >
                  <p>Строки</p>
                  {currentNode?.rows?.map(row => (
                    <p
                      className={styles.objectItem}
                      key={row.object.id}
                      draggable
                      onDragStart={event => {
                        event.dataTransfer.setData(
                          'text/plain',
                          JSON.stringify({ object: row.object, source: 'rows' })
                        );
                      }}
                    >
                      {row.object.field}

                      <CloseIcon
                        onClick={handleRemoveColumn(row.object.id)}
                        className={styles.closeIcon}
                      />
                    </p>
                  ))}
                </div>
                <div
                  onDrop={handleDropObjectValue}
                  onDragOver={allowDrop}
                  style={{ minHeight: 100, minWidth: 100 }}
                >
                  <p>Значения</p>
                  {currentNode?.values?.map(val => (
                    <p
                      className={styles.objectItem}
                      key={val.object.id}
                      draggable
                      onDragStart={event => {
                        event.dataTransfer.setData(
                          'text/plain',
                          JSON.stringify({
                            object: val.object,
                            source: 'values'
                          })
                        );
                      }}
                    >
                      {val.object.field}

                      <CloseIcon
                        onClick={handleRemoveValue(val.object.id)}
                        className={styles.closeIcon}
                      />
                    </p>
                  ))}
                </div>
              </>
            )} */}

            <button type="button" onClick={handleRemoveNode}>
              Удалить элемент
            </button>
          </div>
        );
      // case 2:
      //   return (
      //     <div>
      //       <p>Filters</p>
      //       <p>drop objects from obkects list</p>
      //     </div>
      //   );
      case 3:
        return (
          <div>
            <p>Сортировка</p>
            <button type="button" onClick={handleAddSorting}>
              Добавить сортировку
            </button>
            {currentNode?.sorting?.map(item => (
              <SortingField
                onChange={handleChangeSortingField}
                onRemove={handleRemoveSortingField}
                options={currentNode?.columns?.map(column => ({
                  value: column.object.id,
                  text: column.object.field // todo change to name after back
                }))}
                item={item}
              />
            ))}
          </div>
        );
      case 4:
        return (
          <div>
            {activeNode?.type === 'table' && (
              <NavigationMenu
                menu={NAV_MENU_TABLE}
                onClick={setActiveSubMenu}
                activePage={activeSubMenu}
              />
            )}
            <StyleFormatter
              isHeader={activeSubMenu === 1}
              onChange={params => dispatch(setTableStyle(params))}
            />
          </div>
        );

      default:
        return null;
    }
  }

  function getNavMenuActions() {
    switch (navType) {
      case SIDE_PANEL_TYPES.CONFIG_MENU:
        return renderReportConfigContent();
      case SIDE_PANEL_TYPES.BLOCK_MENU:
        return reportDesigner.reportsData.present.activeNodes.length === 0
          ? null
          : renderBlockPanelContent();
      default:
        return null;
    }
  }

  return (
    <div
      className={styles.root}
      // style={{
      //   right: marginRight
      // }}
    >
      <NavigationMenu
        menu={getNavMenu()}
        onClick={setActivePage}
        activePage={activePage}
      />
      <div className={styles.content}>{getNavMenuActions()}</div>
    </div>
  );
}
