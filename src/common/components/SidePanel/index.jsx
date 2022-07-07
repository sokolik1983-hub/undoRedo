/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash, { cloneDeep, find } from 'lodash';

import Button from '../Button';
import styles from './SidePanel.module.scss';
import NavigationMenu from './NavigationMenu';
import { SIDE_PANEL_TYPES, BUTTON } from '../../constants/common';
import StyleFormatter from './SectionGroup/StyleFormatter';
import {
  addSortingField,
  addTableColumn,
  addTableRow,
  addTableValue,
  setActiveNodes,
  setConfigPanelVisible,
  setStructure,
  setTableStyle,
  removeTableColumn,
  setTableVariant
} from '../../../data/reducers/new_reportDesigner';
import ObjectsList from './ObjectsList';
import { getCurrentReport } from '../../../modules/ReportDesigner/helpers';
import SortingField from './SortingField';
import { ReactComponent as CloseIcon } from '../../../layout/assets/close.svg';
import { TABLE_ICONS } from '../../constants/reportDesigner/reportDesignerIcons';
import { setReportStructure } from '../../../data/actions/newReportDesigner';
import { GraphSettingsData } from './GraphSettingsData';
import { GraphSettingsFormat } from './GraphSettingsFormat';
import { NAV_MENU_TABLE, getNavMenu } from '../../constants/reportDesigner/reportDesignerMenu';
// import { deepObjectSearch } from '../../../data/helpers';

// eslint-disable-next-line react/prop-types
export default function SidePanel({ navType }) {
  const [activePage, setActivePage] = useState(1);
  const [activeSubMenu, setActiveSubMenu] = useState(1);
  const reportDesigner = useSelector(state => state.app.reportDesigner);
  const dispatch = useDispatch();

  const formattingElement = reportDesigner?.reportsUi?.ui?.formattingElement;

  const activeNode =
    reportDesigner.reportsData.present.activeNodes &&
    reportDesigner.reportsData.present.activeNodes[0];

  const currentReport = getCurrentReport(
    reportDesigner.reportsData.present.reports,
    reportDesigner.reportsData.present.activeReport
  );
  const newStructureReport = cloneDeep(currentReport);

  const currentNode = lodash.find(
    newStructureReport?.structure?.pgBody?.content?.children,
    item => item.id === activeNode?.id
  );
  const headerZone = currentNode?.content?.layout?.zones?.filter(
    item => item.vType === 'header'
  );
  const bodyZone = currentNode?.content?.layout?.zones?.filter(
    item => item.vType === 'body'
  );
  const footerZone = currentNode?.content?.layout?.zones?.filter(
    item => item.vType === 'footer'
  );

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
    const cloneReport = lodash.cloneDeep(currentReport);
    cloneReport.structure.pgBody.content.children = currentReport?.structure?.pgBody?.content?.children?.filter(
      item => item.id !== currentNode.id
    );
    dispatch(setStructure(cloneReport.structure));

    // dispatch(
    //   setReportStructure({
    //     report_id: currentReport.id,
    //     structure: cloneReport.structure
    //   })
    // );

    dispatch(setActiveNodes([]));
    dispatch(setConfigPanelVisible(false));
  }

  const handleRemoveColumn = object => event => {
    event?.stopPropagation();

    headerZone[0].cells = headerZone?.[0].cells.filter(
      item => item.col !== object.col
    );
    bodyZone[0].cells = bodyZone?.[0].cells.filter(
      item => item.col !== object.col
    );
    footerZone[0].cells = footerZone?.[0]?.cells.filter(
      item => item.col !== object.col
    );

    // dispatch(
    //   setReportStructure({
    //     report_id: currentReport.id,
    //     structure: newStructureReport?.structure
    //   })
    // );

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

  const handleSetVariant = variant => {
    dispatch(setTableVariant(variant));
    // const newStructureReport = cloneDeep(currentReport);
    const currNode = find(
      newStructureReport?.structure?.pgBody?.content?.children,
      item => item.id === activeNode?.id
    );
    currNode.type = variant;

    // dispatch(
    //   setReportStructure({
    //     report_id: currentReport.id,
    //     structure: newStructureReport?.structure
    //   })
    // );
  };

  function renderBlockPanelContent() {
    switch (activePage) {
      case 1:
        return (
          <>
            {activeNode?.type.includes('Chart') && (
              <GraphSettingsData setVariant={handleSetVariant} />
            )}
            {activeNode?.type.includes('Table') && (
              <>
                <div>
                  <p className={styles.heading}>Преобразовать в</p>
                  <div className={styles.iconsContainer}>
                    {TABLE_ICONS.map(i => (
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
                  className={styles.dropBlock}
                >
                  <p className={styles.heading}>Колонки</p>
                  {/* TODO  headerZone */}
                  {headerZone?.map(zone =>
                      zone.cells?.map(object => {
                        return (
                          <div
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
                            {object?.expression?.formula}
                            <CloseIcon 
                              fill='white'
                              onClick={handleRemoveColumn(object)}
                              className={styles.closeIcon}
                            />
                          </div>
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
                </div>
              </>
                )
              }
            <Button
              className={styles.button}
              buttonStyle={BUTTON.BLUE}
              onClick={handleRemoveNode}
            >
              Удалить элемент
            </Button>
          </> 
        ) 
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
            <p className={styles.heading}>Сортировка</p>
            <Button buttonStyle={BUTTON.BLUE}>Добавить сортировку</Button>
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
            {activeNode?.type.includes('Table') && (
              <>
                <NavigationMenu
                  menu={NAV_MENU_TABLE}
                  onClick={setActiveSubMenu}
                  activePage={activeSubMenu}
                />
            
                <StyleFormatter
                  key={formattingElement?.id}
                  isHeader={activeSubMenu === 1}
                  onChange={params =>
                    dispatch(setTableStyle({ ...params, formattingElement }))
                  }
                  formattingElement={formattingElement}
                />
              </>
            )}
            {activeNode?.type.includes('Chart') && (
              <GraphSettingsFormat />
            )}
            {activeNode?.type === 'cell' && (
              <StyleFormatter
                key={formattingElement?.id}
                isHeader={activeSubMenu === 1}
                onChange={params =>
                dispatch(setTableStyle({ ...params, formattingElement }))
              }
                formattingElement={formattingElement}
              />
            )}
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
    <div className={styles.root}>
      <NavigationMenu
        menu={getNavMenu(navType)}
        onClick={setActivePage}
        activePage={activePage}
      />
      <div className={styles.content}>{getNavMenuActions()}</div>
    </div>
  );
}
