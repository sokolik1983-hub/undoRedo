// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

export const reportDesignerUI = createSlice({
  name: 'reportDesignerUI',
  initialState: {
    ui: {
      showConfigPanel: false,
      showReportPanel: false,
      showFormulaEditor: false,
      creatingElement: null,
      selectedColumns: null,
      zoom: 1,
      formattingElement: null,
      test: 'test',
      menuItem: 'objects',
    },
  },
  reducers: {
    setFormattingElementFormula: (state, action) => {
      state.ui.formattingElement.content.expression.formula =
        action.payload.data;
    },
    setFormattingElement: (state, action) => {
      if (state.ui.formattingElement?.id === action.payload.item?.id) {
        state.ui.formattingElement = null;
      } else {
        state.ui.formattingElement = action.payload.item;
      }
    },
    setSelectedColumns: (state, action) => {
      if (!action.payload) {
        state.ui.selectedColumns = {};
      } else {
        state.ui.selectedColumns = {
          ...state.ui.selectedColumns,
          ...action.payload,
        };
      }
    },
    setCreatingElement: (state, action) => {
      state.ui.creatingElement = action.payload;
    },
    setReportPanelVisible: (state) => {
      state.ui.showReportPanel = !state.ui.showReportPanel;
    },
    setFormulaEditorVisible: (state) => {
      state.ui.showFormulaEditor = !state.ui.showFormulaEditor;
    },
    setConfigPanelVisible: (state, action) => {
      if (action?.payload) {
        state.ui.showConfigPanel = action?.payload;
      } else {
        state.ui.showConfigPanel = !state.ui.showConfigPanel;
      }
    },
    setZoom: (state, action) => {
      state.ui.zoom = action.payload;
    },
    setMenuItem: (state, action) => {
      state.ui.menuItem = action.payload;
    },
  },
});

export const {
  setFormattingElementFormula,
  setFormattingElement,
  setCreatingElement,
  setReportPanelVisible,
  setFormulaEditorVisible,
  setConfigPanelVisible,
  setSelectedColumns,
  setZoom,
  setMenuItem,
  setMenu,
} = reportDesignerUI.actions;
