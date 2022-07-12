/* eslint-disable no-restricted-properties */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-return-assign */
import { getTableIdFromParams } from '../../../../data/helpers';
import Vector from '../vector';

const createSetter = key => ({ state }, val) => (state[key] = val);
const createTablesSetter = key => ({ state }, { tableId, value }) =>
  (state[key] = { ...state[key], [tableId]: value });

export default {
  SET: ({ state }, { key, value }) => (state[key] = value),

  SET_MUL: createSetter('mul'), // (state, mul) => state.mul = mul,
  SET_SHIFT: createSetter('shift'), // (state, shift) => state.shift = shift,

  SET_POSITION: ({ state, commit }, position) => {
    const containerBox = state.rndBgRectRef.current.getBBox();
    commit('SET_MUL', 1);
    commit(
      'SET_SHIFT',
      position
        .sub(Vector.new(containerBox.width / 2, containerBox.height / 2))
        .mul(-1)
    );
  },
  ZOOM_AROUND: ({ state, commit }, { postition, delta }) => {
    const { mul, shift } = state;

    let newMmul = mul * Math.pow(2, delta / 1000);
    newMmul = newMmul > 0 ? newMmul : mul;

    commit('SET_MUL', newMmul);
    commit(
      'SET_SHIFT',
      postition
        .sum(shift)
        .mul(mul)
        .div(newMmul)
        .sub(postition)
    );
  },

  ZOOM_AROUND_CENTER: ({ state, commit }, delta) => {
    const contentBox = state.contentRef.current.getBBox();
    commit('ZOOM_AROUND', {
      postition: Vector.new(
        contentBox.x + contentBox.width / 2,
        contentBox.y + contentBox.height / 2
      ),
      delta
    });
  },

  ZOOM_DEFAULT: ({ state: { contentRef, rndBgRectRef }, commit }) => {
    const padding = 5;
    const contentBox = contentRef.current.getBBox();
    const containerBox = rndBgRectRef.current.getBBox();

    const xMul = containerBox.width / (contentBox.width + padding * 2);
    const yMul = containerBox.height / (contentBox.height + padding * 2);

    const shift = Vector.new(-contentBox.x + padding, -contentBox.y + padding);

    const newMul = Math.min(1, xMul, yMul);

    shift.y += (containerBox.height / newMul - contentBox.height) / 2;
    shift.x += (containerBox.width / newMul - contentBox.width) / 2;

    commit('SET_MUL', newMul);
    commit('SET_SHIFT', shift);
  },

  SET_TABLES_POSTION: createSetter('tablePostition'),
  SET_TABLES_POSITION_CHANGED_CALLBACK: createSetter(
    'tablePostitionChangedCallback'
  ),

  SET_TABLES: ({ state }, tables = []) => {
    console.log(tables)
    state.tables = tables.reduce(
      (result, table) => ({ ...result, [getTableIdFromParams({...table, connect_id: 4})]: table }),
      {}
    );
  },

  SET_TABLE_REFS: createTablesSetter('tableRefs'), // ({state}, {tableId, refs}) => state.tableRefs = {...state.tableRefs, [tableId] : refs} ,
  SET_TABLE_POSITION: ({ state }, { tableId, value }) => {
    state.tablePostition = { ...state.tablePostition, [tableId]: value };
    state.tablePostitionChangedCallback(state.tablePostition);
  },
  SET_EXPANDED: createTablesSetter('expanded'), // ({state}, {tableId, val}) => state.expanded = {...state.expanded, [tableId] : refs}
  SET_FILTER: createTablesSetter('filtres'),

  SET_DRAG_STATE: createSetter('dragState'),

  startDrag: (
    context,
    { event, dragCallback = null, dragStopCallback = null, extra = {} }
  ) => {
    const { state, commit, getter } = context;
    if (state.dragState.anchor) commit('onStopDrag', event);

    commit('SET_DRAG_STATE', {
      ...extra,
      anchor: getter('posToCoord', event),
      dragCallback,
      dragStopCallback
    });
  },

  onStopDrag: (context, event) => {
    if (context.state.dragState.dragStopCallback)
      context.state.dragState.dragStopCallback(context, event);
    context.state.dragState = {};
  },

  onDrag: (context, event) => {
    // if (context.state.dragState.dragCallback)
    context.state.dragState.dragCallback(context, event);
  },

  initLink: ({ state }, { descr, pos }) => {
    state.linkAnchor = pos;
    state.linkDescr = descr;
  },

  SET_SHOW_MINIMAP: ({ state }, value) => (state.showMinimap = value),

  SET_SEARCH_LINE: createSetter('searchLine'),
  UPDATE_SEARCH_RESULT: ({ state, commit }, searchHelper) => {
    state.searchResult = [];

    searchHelper(
      Object.values(state.tables).reduce((acc, table) => {
        const tabledescr = {
          type: 'table',
          name: table.object_name || '',
          tableid: table.id,
          tableName: table.object_name,
          tableSchema: table.schema,
          parentTable: table.parent_table
        };

        acc.unshift(tabledescr);

        for (const columnIndex in table.columns) {
          const column = table.columns[columnIndex];
          acc.push({
            ...tabledescr,
            type: 'column',
            name: column.field || '',
            columnIndex
          });
        }

        return acc;
      }, []),

      result => commit('ADD_SEARCH_RESULT', result),
      obj => obj.name
    );
  },
  SET_SEARCH_RESULT: createSetter('searchResult'),
  ADD_SEARCH_RESULT: ({ state }, result) => {
    state.searchResult.push(result);
  },
  SET_FOCUSED_ITEM: createSetter('focusedItem'),
  SET_SEARCH_POPUP_VISIBLE: ({ state }, value) =>
    (state.searchPopupVisible = value)
};
