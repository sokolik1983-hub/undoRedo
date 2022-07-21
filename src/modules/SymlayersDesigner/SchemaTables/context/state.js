import React from 'react';

export default {
  mul: 1,
  shift: { x: 0, y: 0 },
  tables: {},
  tablePostition: {},
  tableRefs: {},
  expanded: {},
  filtres: {},

  tablePostitionChangedCallback: () => {
    // some action
  },
  getTableId: (tableItem) =>
    tableItem?.parentTable_id
      ? `${tableItem.objectName}`
      : `${tableItem.schema}.${tableItem.objectName}`,

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
  searchPopupVisible: false,
};
