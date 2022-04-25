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
  name: 'Отчет',
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
    data: [
      [
        '6501239104',
        '1116501003981',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АРЕНА СПОРТ"',
        12,
        2020
      ],
      [
        '6501239104',
        '1116501003981',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АРЕНА СПОРТ"',
        12,
        2020
      ],
      [
        '0249007572',
        '1120260000475',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "РИМАР"',
        32,
        2020
      ],
      [
        '7717726617',
        '1127746452305',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ПОТРЕБТОВАРЫ"',
        123,
        2020
      ],
      [
        '2466236679',
        '1112468003471',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ПОТОЛОКСТРОЙ"',
        12,
        2020
      ],
      [
        '7806488700',
        '1127847555175',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "КРЕДО"',
        2,
        2020
      ],
      [
        '7452071419',
        '1097452002856',
        'ОБЩЕСВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЧЕЛЯБСПЕЦТЕХНИКА"',
        2,
        2021
      ],
      [
        '3915005874',
        '1083917002234',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФЕНИКС"',
        345,
        2021
      ],
      [
        '6027010455',
        '1026000975637',
        'МУНИЦИПАЛЬНОЕ ПРЕДПРИЯТИЕ ГОРОДА ПСКОВА "УПРАВЛЕНИЕ КАПИТАЛЬНОГО СТРОИТЕЛЬСТВА"',
        343,
        2021
      ],
      [
        '6714031277',
        '1106714000788',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЮЛА"',
        55,
        2021
      ],
      [
        '7810452801',
        '1137847335670',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АБСОЛЮТ"',
        51,
        2021
      ],
      [
        '3525258608',
        '1113525005109',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФЕНИКС"',
        53,
        2021
      ],
      [
        '6820028597',
        '1096820000122',
        'МУНИЦИПАЛЬНОЕ АВТОНОМНОЕ ДОШКОЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ "ДЕТСКИЙ САД "ВАСИЛЁК"',
        42,
        2022
      ],
      [
        '6102010224',
        '1026100660013',
        'САДОВОДЧЕСКОЕ НЕКОММЕРЧЕСКОЕ ТОВАРИЩЕСТВО "ГАЙДАРЫ"',
        23,
        2022
      ],
      [
        '7743914889',
        '1147746088159',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФОРТУНА"',
        54,
        2022
      ],
      [
        '7810457535',
        '1147847069655',
        'ОЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ДЕЛЬТА"',
        66,
        2022
      ],
      [
        '7729758910',
        '5137746172218',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АБСОЛЮТ"',
        43,
        2022
      ],
      [
        '5902128907',
        '1025900516883',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ДОМИНО"',
        665,
        2022
      ],
      [
        '6617007656',
        '1026601185600',
        'МУНИЦИПАЛЬНОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ КУЛЬТУРЫ ГОРОДСКОГО ОКРУГА КРАСНОТУРЬИНСК ДОМ КУЛЬТУРЫ "ГОРНЯК"',
        23,
        2022
      ],
      [
        '7825428939',
        '1027809229436',
        'ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ ДОШКОЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ ДЕТСКИЙ САД №49 КОМБИНИРОВАННОГО ВИДА ЦЕНТРАЛЬНОГО РАЙОНА САНКТ-ПЕТЕРБУРГА',
        43,
        2021
      ],
      [
        '7744000990',
        '1027739337581',
        '"МОСКОВСКИЙ НЕФТЕХИМИЧЕСКИЙ БАНК" ПУБЛИЧНОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО',
        234,
        2021
      ],
      [
        '5433132158',
        '1025404349080',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ СЕЛЬСКОХОЗЯЙСТВЕННОЕ ПРЕДПРИЯТИЕ "ПЧЕЛОКОМПЛЕКС"',
        54,
        2020
      ],
      [
        '6141023259',
        '1046141008605',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "СВЕРЧОК Ъ"',
        54,
        2022
      ],
      [
        '6164237190',
        '1056164114786',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФЕНИКС"',
        66,
        2022
      ],
      [
        '6102019428',
        '1046102004277',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФЕНИКС"',
        234,
        2021
      ],
      [
        '2540095995',
        '1032502269359',
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ДЕЛЬТА"',
        123,
        2020
      ]
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
      {
        name: 'TERN_ANALYTICS.V_EGRUL_MAIN.INN',
        id: '1455',
        type: 'String'
      },
      {
        name: 'TERN_ANALYTICS.V_EGRUL_MAIN.OGRN',
        id: '1456',
        type: 'String'
      },
      {
        name: 'TERN_ANALYTICS.V_EGRUL_MAIN.NAME_CLEAR',
        id: '1458',
        type: 'String'
      },
      {
        name: 'TERN_ANALYTICS.V_FSSP_DATA_SUM.AMOUNT_DOLG',
        id: '1461',
        type: 'Number'
      },
      {
        name: 'TERN_ANALYTICS.V_EGRUL_MAIN.OGRN_DATE',
        id: '1459',
        type: 'Date'
      }
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
  variant: 'table_vertical',
  position: {
    x: 100,
    y: 100
  },
  scales: {
    width: 200,
    height: 45
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
      showReportPanel: false,
      showFormulaEditor: false,
      creatingElement: null,
      selectedColumns: null,
      tableType: 'cross',
      graphType: 'graph1'
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
  addTableValue
} = reportDesigner.actions;

export const {
  setCreatingElement,
  setReportPanelVisible,
  setFormulaEditorVisible,
  setConfigPanelVisible,
  setSelectedColumns,
  setTableType,
  setGraphType
} = reportDesignerUI.actions;

export default combineReducers({
  reportsUi: reportDesignerUI.reducer,
  reportsData: undoable(reportDesigner.reducer)
});
