import Vector from '../vector';

export default {
  getTableItem: ({ state }, tableId) => {
    return state.tables[tableId];
  },
  getTablePosition: ({ state }, tableId) => {
    return state.tablePostition[tableId];
  },
  getRefs: ({ state }, tableId) => {
    return state.tableRefs[tableId];
  },
  getExpanded: ({ state }, tableId) => {
    return tableId in state.expanded ? state.expanded[tableId] : true;
  },
  getFilter: ({ state }, tableId) => {
    return tableId in state.filtres ? state.filtres[tableId] : '';
  },

  getTableProps: ({ state, getter }, tableId) => {
    const props = {
      tableItem: getter('getTableItem', tableId),
      position: getter('getTablePosition', tableId),
      refs: getter('getRefs', tableId),
      expanded: getter('getExpanded', tableId),
      filter: getter('getFilter', tableId)
    };

    [
      'connect_id',
      'onShowLinkEdit',
      'onSelectField',
      'checkedFields',
      'onChangePosition',
      'isDataLayer'
    ].forEach(key => {
      props[key] = state[key];
    });

    return props;
  },

  posToCoord: ({state},  event) => {
    const container = state.workAreaRef.current;

    const presub = (container && container.getBoundingClientRect()) || {
      x: 0,
      y: 0
    };

    const res = Vector.fromNativeEvent(event)
      .copy()
      .sub(presub)
      // .div(state.mul)
      // .sub(state.shift);

    // console.log('#', Vector.fromNativeEvent(event), '=>', res);

    return res;
  },

  addLink: ({ state }, meta) => {
    if(!state.linkDescr)
      return
    const lnk = {
      leftField: { table: meta.table, selected: meta.field },
      rightField: {
        table: state.linkDescr.table,
        selected: state.linkDescr.field
      }
    };

    state.onShowLinkEdit(true);
    state.onNewLinkItem(lnk);
  }
};
