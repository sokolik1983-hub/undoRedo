import { createSlice } from '@reduxjs/toolkit';
import {
  CONNECTOR_POPUP,
  QUERY_PANEL_POPUP,
  UNIVERSE_POPUP
} from '../../common/constants/popups';

const ui = createSlice({
  name: 'ui',
  initialState: {
    popupVisible: false,
    popupData: {},
    currentPage: '',
    isLoadingData: false
  },
  reducers: {
    setLoadingData: (state, action) => {
      state.isLoadingData = action.payload;
    },
    showQueryPanel: state => {
      state.popupVisible = QUERY_PANEL_POPUP;
    },
    showConnectorPopup: state => {
      state.popupVisible = CONNECTOR_POPUP;
    },
    showUniversePopup: state => {
      state.popupVisible = UNIVERSE_POPUP;
    },
    hidePopup: state => {
      state.popupVisible = false;
      state.popupData = {};
    },
    setPopupData: (state, action) => {
      state.popupData = action.payload;
    },
    clearPopupData: state => {
      state.popupData = {};
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  showQueryPanel,
  showConnectorPopup,
  showReportWizard,
  showUniversePopup,
  hidePopup,
  setPopupData,
  clearPopupData,
  setCurrentPage,
  setLoadingData
} = ui.actions;

export default ui.reducer;
