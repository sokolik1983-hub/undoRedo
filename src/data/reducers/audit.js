import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const audit = createSlice({
  name: 'audit',
  initialState: {
    events: [],
    columns: [
      { id: 'id', name: 'ИД', show: true, order: 1 },
      { id: 'message', name: 'Событие', show: true, order: 2 },
      { id: 'struct_name', name: 'struct_name', show: true, order: 3 },
      { id: 'user_name', name: 'user_name', show: true, order: 4 },
      { id: 'audit_time', name: 'audit_time', show: true, order: 5 }
    ],
    search: {},
    filters: {
      time_start: moment(Date.now() - 1 * 24 * 3600 * 1000).format(
        'DD.MM.YYYY'
      ),
      time_finish: null
    },
    ui: {
      showFilterPanel: false
    }
  },

  reducers: {
    showFilterPanel: state => {
      state.ui.showFilterPanel = !state.ui.showFilterPanel;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    }
  }
});

export const {
  showFilterPanel,
  setEvents,
  setSearch,
  setFilters,
  setColumns
} = audit.actions;

export default audit.reducer;
