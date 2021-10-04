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
    currentPage: ''
  },
  reducers: {
    showQueryPanel: state => ({
      ...state,
      popupVisible: QUERY_PANEL_POPUP
    }),
    showConnectorPopup: state => ({
      ...state,
      popupVisible: CONNECTOR_POPUP
    }),
    showUniversePopup: state => ({
      ...state,
      popupVisible: UNIVERSE_POPUP
    }),
    hidePopup: state => ({
      ...state,
      popupVisible: false,
      popupData: {}
    }),
    setPopupData: (state, action) => ({
      ...state,
      popupData: action.payload
    }),
    clearPopupData: state => ({
      ...state,
      popupData: {}
    }),
    setCurrentPage: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
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
  setCurrentPage
} = ui.actions;

export default ui.reducer;
