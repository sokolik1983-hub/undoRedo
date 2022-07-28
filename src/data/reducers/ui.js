import { createSlice } from '@reduxjs/toolkit';

import {
  CONFIRM_MODAL,
  CONNECTOR_POPUP,
  CREATE_OBJECT_MODAL,
  EDIT_OBJECT_MODAL,
  OBJECTS_CONNECTIONS_MODAL,
  QUERY_PANEL_MODAL,
  TABLE_PREVIEW_MODAL,
  UNIVERSE_MODAL,
  UNIVERSE_POPUP,
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
    modalEditObjectVisible: false,
    confirmModalVisible: false,
    editConnectorModalVisible: false,
    toastList: [],
  },
  reducers: {
    showNav: (state, action) => {
      state.isNavShowing = action.payload;
    },
    setLoadingData: (state, action) => {
      state.isLoadingData = action.payload;
    },
    showConnectorPopup: (state) => {
      state.popupVisible = CONNECTOR_POPUP;
    },
    showUniversePopup: (state) => {
      state.popupVisible = UNIVERSE_POPUP;
    },
    showObjectsConnectionsModal: (state, action) => {
      state.modalData = action?.payload;
      state.modalVisible = OBJECTS_CONNECTIONS_MODAL;
    },
    showQueryPanelModal: (state) => {
      state.modalVisible = QUERY_PANEL_MODAL;
    },
    hidePopup: (state) => {
      state.popupVisible = false;
      state.popupData = {};
    },
    closeModal: (state) => {
      state.modalVisible = false;
      state.modalData = {};
    },
    setPopupData: (state, action) => {
      state.popupData = action.payload;
    },
    clearPopupData: (state) => {
      state.popupData = {};
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    showSemanticLayerModal: (state) => {
      state.modalVisible = UNIVERSE_MODAL;
    },
    showCreateObjectModal: (state, action) => {
      state.modalCreateObjectVisible = CREATE_OBJECT_MODAL;
      state.modaldata = action.payload;
    },
    closeCreateObjectModal: (state) => {
      state.modalCreateObjectVisible = false;
    },
    showEditObjectModal: (state, action) => {
      state.modalData = action.payload;
      state.modalEditObjectVisible = EDIT_OBJECT_MODAL;
    },
    closeEditObjectModal: (state) => {
      state.modalEditObjectVisible = false;
    },
    showTablePreviewModal: (state) => {
      state.modalVisible = TABLE_PREVIEW_MODAL;
    },
    showConfirmModal: (state) => {
      state.confirmModalVisible = CONFIRM_MODAL;
    },
    closeConfirmModal: (state) => {
      state.confirmModalVisible = false;
    },
    showEditConnectorModal: (state) => {
      state.editConnectorModalVisible = true;
    },
    closeEditConnectorModal: (state) => {
      state.editConnectorModalVisible = false;
    },
    setToastList: (state, action) => {
      state.toastList = action.payload;
    },
  },
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
  showEditObjectModal,
  closeEditObjectModal,
  closeCreateObjectModal,
  showConfirmModal,
  closeConfirmModal,
  setToastList,
  showEditConnectorModal,
  closeEditConnectorModal,
} = ui.actions;

export default ui.reducer;
