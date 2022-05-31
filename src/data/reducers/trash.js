import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const trash = createSlice({
  name: 'trash',
  initialState: {
    columns: [
      { id: 'drop_dt', name: 'Дата', show: true, order: 1 },
      { id: 'type_name', name: 'Тип', show: true, order: 2 },
      { id: 'name', name: 'Имя', show: true, order: 3 }
    ],
    items: [],
    searchString: '',
    ui: {
      showFilterPanel: false
    },
    filters: {
      time_start: moment(Date.now()).format('DD.MM.YYYY')
    },
    trashFolderId: 0
  },

  reducers: {
    showFilterPanel: state => {
      state.ui.showFilterPanel = !state.ui.showFilterPanel;
    },
    setTrash: (state, action) => {
      state.items = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    }, 
    setTrashFolderId: (state, action) => {
      state.trashFolderId = action.payload;
    }
  }
});

export const {
  setSearchString,
  setTrash,
  setColumns,
  showFilterPanel,
  setTrashFolderId
} = trash.actions;

export default trash.reducer;