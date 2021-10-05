import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const audit = createSlice({
  name: 'audit',
  initialState: {
    events: [],
    columns: [
      { id: 'id', name: 'ИД', show: true },
      { id: 'message', name: 'Событие', show: true }
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
    }
  }
});

export const {
  showFilterPanel,
  setEvents,
  setSearch,
  setFilters
} = audit.actions;

export default audit.reducer;
