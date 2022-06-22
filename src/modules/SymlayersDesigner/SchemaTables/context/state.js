import React from 'react';

export default {
  mul: 1,
  shift: { x: 0, y: 0 },
  tables: {},
  tablePostition: {},
  tableRefs: {},
  expanded: {},
  filtres: {},

  tablePostitionChangedCallback: () => {},
  getTableId: tableItem =>
    tableItem?.parent_table
      ? `${tableItem?.object_name}`
      : `${tableItem?.schema}.${tableItem?.object_name}`,

  workAreaRef: React.createRef(),
  rndBgRectRef: React.createRef(),
  contentRef: React.createRef(),

  connect_id: null,
  onShowLinkEdit: null,
  onSelectField: null,
  checkedFields: null,
  onChangePosition: null,
  isDataLayer: null,
  onNewLinkItem: null,

  dragState: {},

  linkAnchor: null,
  linkDescr: null,

  showMinimap: false,

  searchLine: '',
  searchResult: [],
  focusedItem: null,
  searchPopupVisible: false
};
