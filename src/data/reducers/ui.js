import { createSlice } from '@reduxjs/toolkit';
import {
  CONNECTOR_POPUP, OBJECTS_CONNECTIONS_MODAL,
  QUERY_PANEL_MODAL, UNIVERSE_MODAL,
  UNIVERSE_POPUP, CREATE_OBJECT_MODAL, TABLE_PREVIEW_MODAL,
} from '../../common/constants/popups';

const ui = createSlice({
  name: 'ui',
  initialState: {
    popupVisible: false,
    modalVisible: false,
    popupData: {},
    currentPage: '',
    isLoadingData: false,
    isNavShowing: false,
    modalCreateObjectVisible: false,
  },
  reducers: {
    showNav: (state, action) => {
      state.isNavShowing = action.payload;
    },
    setLoadingData: (state, action) => {
      state.isLoadingData = action.payload;
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
    showQueryPanelModal: state => {
      state.modalVisible = QUERY_PANEL_MODAL;
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
    },
    showSemanticLayerModal: state => {
      state.modalVisible = UNIVERSE_MODAL;
    },
    showCreateObjectModal: state => {
      state.modalCreateObjectVisible = CREATE_OBJECT_MODAL;
    },
    closeCreateObjectModal: state => {
      state.modalCreateObjectVisible = false;
    },
    showTablePreviewModal: state => {
      state.modalVisible = TABLE_PREVIEW_MODAL;
    }
  }
});

export const {
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
  showQueryPanelModal,
  showTablePreviewModal,
  showSemanticLayerModal,
  closeModal,
  showCreateObjectModal,
  closeCreateObjectModal,
} = ui.actions;

export default ui.reducer;
