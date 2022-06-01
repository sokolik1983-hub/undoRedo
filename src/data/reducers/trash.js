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
    trash: [],
    connectorTrash: [],
    reportTrash: [],
    searchString: '',
    ui: {
      showFilterPanel: false
    },
    filters: {
      time_start: moment(Date.now()).format('DD.MM.YYYY')
    },
    trashConFolderId: 0,
    trashRepFolderId: 0,
    connectorTrashIsLoad: false,
    reportTrashIsLoad: false,
    otherTrashIsLoad: false
  },

  reducers: {
    showFilterPanel: state => {
      state.ui.showFilterPanel = !state.ui.showFilterPanel;
    },
    setTrash: (state, action) => {
      state.trash = action.payload;
      state.otherTrashIsLoad = true;
      state.reportTrash = false;
      state.connectorTrash = false;
    },
    setConnectorTrash: (state, action) => {
      state.connectorTrash = action.payload;
      state.otherTrashIsLoad = false;
      state.connectorTrashIsLoad = true;
    },
    setReportTrash: (state, action) => {
      state.reportTrash = action.payload;
      state.reportTrashIsLoad = true;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    }, 
    setTrashConFolderId: (state, action) => {
      state.trashConFolderId = action.payload;
    },
    setTrashRepFolderId: (state, action) => {
      state.trashRepFolderId = action.payload;
    }
  }
});

export const {
  setSearchString,
  setTrash,
  setConnectorTrash,
  setReportTrash,
  setColumns,
  showFilterPanel,
  setTrashConFolderId,
  setTrashRepFolderId,
} = trash.actions;

export default trash.reducer;