import { createSlice } from '@reduxjs/toolkit';
import {
  CONNECTOR_POPUP, OBJECTS_CONNECTIONS_MODAL,
  QUERY_PANEL_POPUP,
  UNIVERSE_POPUP
} from '../../common/constants/popups';

const ui = createSlice({
  name: 'ui',
  initialState: {
    popupVisible: false,
    modalVisible: false,
    popupData: {},
    currentPage: '',
    isLoadingData: false,
    isNavShowing: false
  },
  reducers: {
    showNav: (state, action) => {
      state.isNavShowing = action.payload;
    },
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
    showObjectsConnectionsModal: state => {
      state.modalVisible = OBJECTS_CONNECTIONS_MODAL;
    },
    hidePopup: state => {
      state.popupVisible = false;
      state.popupData = {};
    },
    closeModal: state => {
      state.modalVisible = false;
      state.modalData = {};
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
  setLoadingData,
  showNav,
  showObjectsConnectionsModal,
  closeModal,
} = ui.actions;

export default ui.reducer;
