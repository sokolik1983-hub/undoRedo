import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const audit = createSlice({
  name: 'audit',
  initialState: {
    events: [],
    columns: [
      { id: 'id', name: 'ИД', show: true, order: 1 },
      { id: 'message', name: 'Событие', show: true, order: 2 },
      { id: 'struct_name', name: 'Имя объекта', show: true, order: 3 },
      { id: 'user_name', name: 'Пользователь', show: true, order: 4 },
      { id: 'audit_time', name: 'Дата и время', show: true, order: 5 }
    ],
    search: {},
    filters: {
      time_start: moment(Date.now()).format(
        'DD.MM.YYYY'
      ),
    },
    ui: {
      showFilterPanel: false
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
