/* eslint-disable no-debugger */
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
  setStructure,
  setTableStyle,
  setTableVariant,
  sortingObject
} from '../../../data/reducers/reportDesigner';
import ObjectsList from './ObjectsList';
import { getCurrentReport } from '../../../modules/ReportDesigner/helpers';
import SortingField from './SortingField';

const NAV_MENU_REPORT = [
  { id: 1, title: 'Data', icon: <ExtensionIcon /> },
  { id: 2, title: 'Structure', icon: <AccountTreeIcon /> },
  { id: 3, title: 'Comments', icon: <ForumIcon /> },
  { id: 4, title: 'Export', icon: <InfoIcon /> }
];

const NAV_MENU_BLOCK = [
  { id: 1, title: 'Data', icon: <TuneIcon /> },
  // { id: 2, title: 'Filters', icon: <FilterListIcon /> },
  { id: 3, title: 'Sorting', icon: <SortIcon /> },
  { id: 4, title: 'Format', icon: <BrushIcon /> }
];

const NAV_MENU_TABLE = [
  { id: 1, title: 'Header', icon: <>Header</> },
  { id: 2, title: 'Cells', icon: <>Cells</> }
];

// eslint-disable-next-line react/prop-types
export default function SidePanel({ marginRight, navType }) {
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
    currentReport?.structure,
    item => item.id === activeNode?.id
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
            <p>Structure</p>
            {currentReport?.structure?.map(item => (
              <p>{item.title || item.type}</p>
            ))}
          </div>
        );
      case 3:
        return <div>Comments</div>;
      case 4:
        return <div>Info</div>;

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
    // eslint-disable-next-line no-debugger
    debugger;
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
    // eslint-disable-next-line no-debugger
    debugger;
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
  }

  const handleRemoveColumn = columnId => event => {
    event?.stopPropagation();

    dispatch(
      setStructure(
        currentReport?.structure?.map(item => {
          const clone = lodash.cloneDeep(item);
          if (clone?.id === currentNode?.id) {
            clone.columns = currentNode?.columns?.filter(
              col => col?.object?.id !== columnId
            );
          }
          return clone;
        })
      )
    );
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

    dispatch(
      addTableColumn({
        column: { ...columnObject, object: { ...selectedEl.object } },
        id: currentNode?.id
      })
    );
  }
  function handleDropObjectRow(event) {
    const selectedEl = JSON.parse(event.dataTransfer.getData('text'));
    event.dataTransfer.clearData();
    refreshFieldsStore(selectedEl);

    dispatch(
      addTableRow({
        row: { ...columnObject, object: { ...selectedEl.object } },
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
        value: { ...columnObject, object: { ...selectedEl.object } },
        id: currentNode?.id
      })
    );
  }

  const handleSetVariant = variant => () => {
    dispatch(setTableVariant(variant));
  };

  function renderBlockPanelContent() {
    switch (activePage) {
      case 1:
        return (
          <div>
            <div>
              <p>Transform into:</p>
              <button type="button" onClick={handleSetVariant('cross')}>
                cross
              </button>
              <button type="button" onClick={handleSetVariant('vertical')}>
                vertical
              </button>
              <button type="button" onClick={handleSetVariant('horizontal')}>
                horizontal
              </button>
            </div>

            <div
              onDrop={handleDropObjectColumn}
              onDragOver={allowDrop}
              style={{ minHeight: 100, minWidth: 100 }}
            >
              <p>Columns</p>
              {currentNode?.columns?.map(column => (
                <p
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
                  {column.object.name}
                  <button
                    type="button"
                    onClick={handleRemoveColumn(column.object.id)}
                  >
                    remove column
                  </button>
                </p>
              ))}
            </div>

            {currentNode?.variant === 'cross' && (
              <>
                <div
                  onDrop={handleDropObjectRow}
                  onDragOver={allowDrop}
                  style={{ minHeight: 100, minWidth: 100 }}
                >
                  <p>Rows</p>
                  {currentNode?.rows?.map(row => (
                    <p
                      key={row.object.id}
                      draggable
                      onDragStart={event => {
                        event.dataTransfer.setData(
                          'text/plain',
                          JSON.stringify({ object: row.object, source: 'rows' })
                        );
                      }}
                    >
                      {row.object.name}
                      <button
                        type="button"
                        onClick={handleRemoveRow(row.object.id)}
                      >
                        remove row
                      </button>
                    </p>
                  ))}
                </div>
                <div
                  onDrop={handleDropObjectValue}
                  onDragOver={allowDrop}
                  style={{ minHeight: 100, minWidth: 100 }}
                >
                  <p>Values</p>
                  {currentNode?.values?.map(val => (
                    <p
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
                      {val.object.name}
                      <button
                        type="button"
                        onClick={handleRemoveValue(val.object.id)}
                      >
                        remove val
                      </button>
                    </p>
                  ))}
                </div>
              </>
            )}

            <button type="button" onClick={handleRemoveNode}>
              remove node
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
            <p>Soring</p>
            <button type="button" onClick={handleAddSorting}>
              add sorting
            </button>
            {currentNode?.sorting?.map(item => (
              <SortingField
                onChange={handleChangeSortingField}
                onRemove={handleRemoveSortingField}
                options={currentNode?.columns?.map(column => ({
                  value: column.object.id,
                  text: column.object.name
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
      style={{
        right: marginRight
      }}
    >
      <NavigationMenu
        menu={getNavMenu()}
        onClick={setActivePage}
        activePage={activePage}
      />
      {getNavMenuActions()}
    </div>
  );
}
