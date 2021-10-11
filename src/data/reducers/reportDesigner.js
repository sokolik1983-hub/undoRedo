import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';

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
  id: 1,
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

const reportDesigner = createSlice({
  name: 'reportDesigner',
  initialState: {
    reports: [reportObject],
    activeReport: 0,
    activeNodes: [],
    ui: {
      showConfigPanel: false,
      showReportPanel: false,
      showFormulaEditor: false,
      creatingElement: null,
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
    },
    setActiveReport: (state, action) => {
      state.activeReport = action.payload;
    },
    setActiveNodes: (state, action) => {
      state.activeNodes = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    setStructure: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );
      report.structure = action.payload;
    }
  }
});

export const {
  setReportPanelVisible,
  setConfigPanelVisible,
  setFormulaEditorVisible,
  setReports,
  setActiveReport,
  setStructure,
  setActiveNodes,
  setCreatingElement
} = reportDesigner.actions;

export default reportDesigner.reducer;
