import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const audit = createSlice({
  name: 'audit',
  initialState: {
    events: [],
    columns: [
      { id: 'message', name: 'Имя', show: true, order: 1 },
      { id: 'struct_name', name: 'Тип файла', show: true, order: 2 },
      { id: 'audit_time', name: 'Дата и время', show: true, order: 3 }
    ],
    search: {},
    filters: {
      time_start: moment(Date.now()).format(
        'DD.MM.YYYY'
      ),
    },
    ui: {
      showFilterPanel: true
    },
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
    },
  }
});

export const {
  showFilterPanel,
  setEvents,
  setSearch,
  setFilters,
  setColumns,
} = audit.actions;

export default audit.reducer;
