import { combineReducers } from 'redux';
/* eslint-disable no-lonely-if */
import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';
import undoable from 'redux-undo';

export const columnObject = {
  object: {},
  header: {
    styles: {}
  },
  cells: {
    styles: {},
    format: ''
  },
  order: 1
};
export const sortingObject = {
  field: '',
  sortingType: 'ASC' // DESC
};
export const reportObject = {
  id: 0,
  name: 'Report',
  config: {
    connector: null,
    universe: null,
    formulas: [],
    objects: [
      { id: '00001', name: 'INN' },
      { id: '00002', name: 'OGRN' },
      { id: '00003', name: 'COUNT' },
      { id: '00004', name: 'YEAR' },
      { id: '00005', name: 'SUMMA' }
    ],
    filters: [],
    prompts: [],
    lists: []
  },
  dataset: {
    data: [
      ['1', '11', '1', '2020', '11'],
      ['1', '32', '2', '2020', '22'],
      ['1', '33', '3', '2020', '33'],
      ['3', '34', '4', '2021', '44'],
      ['9', '23', '5', '2021', '55'],
      ['5', '55', '6', '2021', '66'],
      ['7', '68', '7', '2022', '77'],
      ['8', '66', '8', '2022', '88'],
      ['10', '65', '9', '2022', '99']
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],
      // ['1', '11'],
      // ['1', '32'],
      // ['1', '33'],
      // ['3', '34'],
      // ['9', '23'],
      // ['5', '55'],
      // ['7', '68'],
      // ['8', '66'],
      // ['10', '65'],

      // ['11', '54']
    ],
    fields: [
      { id: '00001', name: 'INN' },
      { id: '00002', name: 'OGRN' },
      { id: '00003', name: 'COUNT' },
      { id: '00004', name: 'YEAR' },
      { id: '00005', name: 'SUMMA' }
    ],
    query: ''
  },
  structure: []
};
export const tableObject = {
  id: 1,
  title: 'Table 1',
  titlePosition: 'center',
  type: 'table',
  variant: '',
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 200,
    height: 70
  },
  sorting: [],
  filters: [
    {
      field: '',
      condition: 'EQUAL',
      value: ''
    }
  ],
  styles: {},
  columns: [],
  rows: [],
  values: []
};
export const graphObject = {
  id: 2,
  title: 'Graph 1',
  titlePosition: 'center',
  legend: 'show',
  legendPosition: 'center',
  type: 'graph',
  variant: 'graph1',
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
    },
    setTableStyle: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      state.activeNodes.forEach(node => {
        const reportNode = lodash.find(
          report.structure,
          item => item.id === node.id
        );

        reportNode.columns.forEach(column => {
          if (action.payload.column) {
            if (action.payload.column === column.object.id)
              if (action.payload.isHeader) {
                column.header.styles = action.payload.styles
                  ? {
                      ...column.header.styles,
                      ...action.payload.styles
                    }
                  : {};
              } else {
                column.cells.styles = action.payload.styles
                  ? {
                      ...column.cells.styles,
                      ...action.payload.styles
                    }
                  : {};
              }
          } else {
            if (action.payload.isHeader) {
              column.header.styles = action.payload.styles
                ? {
                    ...column.header.styles,
                    ...action.payload.styles
                  }
                : {};
            } else {
              column.cells.styles = action.payload.styles
                ? {
                    ...column.cells.styles,
                    ...action.payload.styles
                  }
                : {};
            }
          }
        });
      });
    },
    addTableColumn: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      const reportNode = lodash.find(
        report.structure,
        item => item.id === action.payload.id
      );

      reportNode.columns = [...reportNode.columns, action.payload.column];
    },
    addTableRow: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      const reportNode = lodash.find(
        report.structure,
        item => item.id === action.payload.id
      );

      reportNode.rows = [...reportNode.rows, action.payload.row];
    },
    addTableValue: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      const reportNode = lodash.find(
        report.structure,
        item => item.id === action.payload.id
      );

      reportNode.values = [...reportNode.values, action.payload.value];
    },
    addSortingField: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      const reportNode = lodash.find(
        report.structure,
        item => item.id === action.payload.id
      );

      reportNode.sorting = action.payload.sorting;
    },
    setTableVariant: (state, action) => {
      const report = lodash.find(
        state.reports,
        item => item.id === state.activeReport
      );

      state.activeNodes.forEach(node => {
        const reportNode = lodash.find(
          report.structure,
          item => item.id === node.id
        );

        reportNode.variant = action.payload;
      });
    }
  }
});

const reportDesignerUI = createSlice({
  name: 'reportDesignerUI',
  initialState: {
    ui: {
      showConfigPanel: false,
      showReportPanel: true,
      showFormulaEditor: false,
      creatingElement: null,
      selectedColumns: null,
      tableType: 'cross',
      graphType: 'graph1',
    }
  },
  reducers: {
    setSelectedColumns: (state, action) => {
      if (!action.payload) {
        state.ui.selectedColumns = {};
      } else {
        state.ui.selectedColumns = {
          ...state.ui.selectedColumns,
          ...action.payload
        };
      }
    },
    setCreatingElement: (state, action) => {
      state.ui.creatingElement = action.payload;
    },
    setReportPanelVisible: state => {
      state.ui.showReportPanel = !state.ui.showReportPanel;
    },
    setFormulaEditorVisible: state => {
      state.ui.showFormulaEditor = !state.ui.showFormulaEditor;
    },
    setConfigPanelVisible: (state, action) => {
      if (action?.payload) {
        state.ui.showConfigPanel = action?.payload;
      } else {
        state.ui.showConfigPanel = !state.ui.showConfigPanel;
      }
    },
    setTableType: (state, action) => {
      state.ui.tableType = action.payload;
    },
    setGraphType: (state, action) => {
      state.ui.graphType = action.payload;
    }
  }
});

export const {
  setActiveReport,
  setActiveNodes,
  setReports,
  setStructure,
  setActiveNodeStyle,
  setTableStyle,
  addTableColumn,
  addSortingField,
  setTableVariant,
  addTableRow,
  addTableValue,
} = reportDesigner.actions;

export const {
  setCreatingElement,
  setReportPanelVisible,
  setFormulaEditorVisible,
  setConfigPanelVisible,
  setSelectedColumns,
  setTableType,
  setGraphType,
} = reportDesignerUI.actions;

export default combineReducers({
  reportsUi: reportDesignerUI.reducer,
  reportsData: undoable(reportDesigner.reducer)
});
