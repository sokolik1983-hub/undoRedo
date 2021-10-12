import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';

export const reportObject = {
  id: 0,
  name: 'Report',
  config: {
    connector: null,
    universe: null,
    formulas: [],
    objects: [],
    filters: [],
    prompts: [],
    lists: []
  },
  dataset: {
    data: [],
    fields: [],
    query: ''
  },
  structure: []
};
export const tableObject = {
  id: 1,
  title: 'Table 1',
  titlePosition: 'center',
  type: 'table',
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 250,
    height: 250
  },
  sorting: {
    field: '',
    sortingType: ''
  },
  filters: [],
  styles: {},
  columns: [
    {
      object: {},
      header: {
        styles: {}
      },
      cells: {
        styles: {},
        format: ''
      }
    }
  ]
};
export const graphObject = {
  id: 2,
  title: 'Graph 1',
  titlePosition: 'center',
  legend: 'show',
  legendPosition: 'center',
  type: 'graph',
  graphType: 'graph',
  styles: {},
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 250,
    height: 250
  },
  filters: [],
  objects: {
    yAxis: [],
    xAxis: [],
    default: []
  }
};
export const shapeObject = {
  id: 3,
  title: 'Shape 1',
  type: 'shape',
  shapeType: 'rect',
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 250,
    height: 250
  }
};
export const textObject = {
  id: 4,
  title: 'Text 1',
  type: 'text',
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 250,
    height: 250
  },
  object: {},
  styles: {}
};

const reportDesigner = createSlice({
  name: 'reportDesigner',
  initialState: {
    reports: [reportObject],
    activeReport: 0,
    activeNodes: []
  },
  reducers: {
    setActiveReport: (state, action) => {
      state.activeReport = action.payload;
    },
    setActiveNodes: (state, action) => {
      state.activeNodes = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload.reports;
      state.activeReport = action.payload.activeReport;
    },
    setStructure: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );
      report.structure = action.payload;
    },
    setActiveNodeStyle: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      state.activeNodes.forEach(node => {
        const reportNode = lodash.find(
          report.structure,
          item => item.id === node.id
        );

        reportNode.styles = { ...reportNode.styles, ...action.payload };
      });
    }
  }
});

const reportDesignerUI = createSlice({
  name: 'reportDesignerUI',
  initialState: {
    ui: {
      showConfigPanel: false,
      showReportPanel: false,
      showFormulaEditor: false,
      creatingElement: null
    }
  },
  reducers: {
    setCreatingElement: (state, action) => {
      state.ui.creatingElement = action.payload;
    },
    setReportPanelVisible: state => {
      state.ui.showReportPanel = !state.ui.showReportPanel;
    },
    setFormulaEditorVisible: state => {
      state.ui.showFormulaEditor = !state.ui.showFormulaEditor;
    },
    setConfigPanelVisible: state => {
      state.ui.showConfigPanel = !state.ui.showConfigPanel;
    }
  }
});

export const {
  setActiveReport,
  setActiveNodes,
  setReports,
  setStructure,
  setActiveNodeStyle
} = reportDesigner.actions;

export const {
  setCreatingElement,
  setReportPanelVisible,
  setFormulaEditorVisible,
  setConfigPanelVisible
} = reportDesignerUI.actions;

export default combineReducers({
  reportsUi: reportDesignerUI.reducer,
  reportsData: undoable(reportDesigner.reducer)
});
