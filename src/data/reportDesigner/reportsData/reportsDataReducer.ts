// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import lodash from 'lodash';

export const variableObject = {
  varType: 'DP',
  dp_id: 'DP0',
  id: 'DP0.V1',
  name: 'Первая буква города',
  type: 'Dimension',
  dataType: 'String',
  formula: '=substr([Город], 1, 1)',
  parsedFormula: '=f1([DP0.D2], 1, 1)',
};
export const reportObject = {
  header: {},
  data: {
    properties: {
      refreshOnOpen: false,
      purgeBeforeSave: false,
    },
    dps: [],
    variables: [],
    reports: [],
  },
};
export const cellObject = {
  id: 'R1.1',
  type: 'cell',
  name: 'ячейка 1',
  size: {
    minimalHeight: 10,
    minimalWidth: 120,
    autofitWidth: false,
    autofitHeight: false,
  },
  position: {
    xType: 'Absolute',
    yType: 'Absolute',
    x: 20,
    y: 10,
  },
  style: {},
  content: {
    expression: {
      type: 'Measure', // Const | Measure
      dataType: 'Number', // String | Number
      formula: '=sum([Продажи])', // если Measure то начинается с =
      parsedFormula: '=F101([DP0.M1])', // formula | const value - необязательно если константа
      outputFormat: '0.00', // необязательно если константа
    },
  },
};
export const sectionAxesExpression = {
  type: 'Dimension',
  dataType: 'String',
  variable_id: 'DP0.D2',
  sort: {
    sortOrder: 'Asc',
    sortNum: 1, // not required
  },
};
export const sectionAxes = {
  id: 1,
  role: 'Row', // Row | Column
  name: 'Строки',
  expressions: [
    // {
    //   type: 'Dimension',
    //   dataType: 'String',
    //   variable_id: 'DP0.D1',
    //   sort: {
    //     sortOrder: 'None'
    //   }
    // },
    // {
    //   type: 'Dimension',
    //   dataType: 'String',
    //   variable_id: 'DP0.D2',
    //   sort: {
    //     sortOrder: 'Asc',
    //     sortNum: 1
    //   }
    // },
    // {
    //   type: 'Dimension',
    //   dataType: 'String',
    //   variable_id: 'DP0.D3',
    //   sort: {
    //     sortOrder: 'None'
    //   }
    // },
    // {
    //   type: 'Measure',
    //   dataType: 'Number',
    //   variable_id: 'DP0.M1',
    //   sort: {
    //     sortOrder: 'None'
    //   }
    // }
  ],
};
export const section = {
  id: 'R1.3',
  type: 'section',
  name: 'Секция Первая буква города',
  size: {
    minimalHeight: 50,
  },
  content: {
    axes: [
      {
        id: 1,
        role: 'Row',
        name: 'Первая буква города',
        expressions: [
          {
            type: 'Dimension',
            dataType: 'String',
            variable_id: 'DP0.V1',
            sort: {
              sortOrder: 'Asc',
              sortNum: 1,
            },
          },
        ],
      },
    ],
    dataFilter: {
      // для примера фильтр - в списке
      type: 'filter',
      filterTarget_id: 'DP0.V1',
      filterOperator: 'InList',
      filterOperand1: ['М', 'Т'],
    },
    children: [
      // ячейка и таблица в секции
      // {
      //   id: 'R1.3.1',
      //   type: 'cell',
      //   name: 'ячейка 3',
      //   size: {
      //     minimalHeight: 10,
      //     minimalWidth: 120,
      //     autofitWidth: false,
      //     autofitHeight: false
      //   },
      //   position: {
      //     xType: 'Absolute',
      //     yType: 'Relative_Element_Top',
      //     x: 20,
      //     yRelativeElement: 'R1.3',
      //     y: 5
      //   },
      //   style: {},
      //   content: {
      //     expression: {
      //       type: 'Dimension',
      //       dataType: 'String',
      //       formula: '=[Первая буква города]',
      //       parsedFormula: '=[DP0.V1]'
      //     }
      //   }
      // },
      // таблица
      {
        id: 'R1.3.2',
        type: 'vTable',
        name: 'Блок 1',
        position: {
          xType: 'Absolute',
          yType: 'Relative_Element_Top',
          x: 10,
          yRelativeElement: 'R1.3.1',
          y: 5,
        },
        style: {},
        content: {
          axes: [
            {
              id: 1,
              role: 'Row',
              name: 'Строки',
              expressions: [
                {
                  type: 'Dimension',
                  dataType: 'String',
                  variable_id: 'DP0.D1',
                  sort: {
                    sortOrder: 'None',
                  },
                },
                {
                  type: 'Dimension',
                  dataType: 'String',
                  variable_id: 'DP0.D2',
                  sort: {
                    sortOrder: 'Asc',
                    sortNum: 1,
                  },
                },
                {
                  type: 'Dimension',
                  dataType: 'String',
                  variable_id: 'DP0.D3',
                  sort: {
                    sortOrder: 'None',
                  },
                },
                {
                  type: 'Measure',
                  dataType: 'Number',
                  variable_id: 'DP0.M1',
                  sort: {
                    sortOrder: 'None',
                  },
                },
              ],
            },
          ],
          dataFilter: null,
          layout: {
            headerZone: [
              // набор строк заголовка таблицы (здесь 1 строка)
              {
                id: 'R1.3.2.H1',
                height: 10,
                cells: [
                  {
                    id: 'R1.3.2.H1.1',
                    span: 1,
                    size: { minimalWidth: 60 },
                    expression: {
                      type: 'Const',
                      dataType: 'String',
                      formula: '=NameOf([Страна])',
                      parsedFormula: '=F11([DP0.D1]]',
                    },
                    style_id: 's11',
                  },
                  {
                    id: 'R1.3.2.H1.2',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Const',
                      dataType: 'String',
                      formula: '=NameOf([Город])',
                      parsedFormula: '=F11([DP0.D2]]',
                    },
                    style_id: 's11',
                  },
                  {
                    id: 'R1.3.2.H1.3',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Const',
                      dataType: 'String',
                      formula: '=NameOf([Год])',
                      parsedFormula: '=F11([DP0.D3]]',
                    },
                    style_id: 's11',
                  },
                  {
                    id: 'R1.3.2.H1.4',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Const',
                      dataType: 'String',
                      formula: '=NameOf([Продажи])',
                      parsedFormula: '=F11([DP0.M1]]',
                    },
                    style_id: 's11',
                  },
                ],
              },
            ],
            bodyZone: [
              // набор строк тела таблицы (здесь 1 строка)
              {
                id: 'R1.3.2.B1',
                height: 8,
                cells: [
                  {
                    id: 'R1.3.2.B1.1',
                    span: 1,
                    expression: {
                      type: 'Dimension',
                      dataType: 'String',
                      formula: '=[Страна]',
                      parsedFormula: '=[DP0.D1]',
                    },
                    style_id: 's12',
                  },
                  {
                    id: 'R1.3.2.B1.2',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Dimension',
                      dataType: 'String',
                      formula: '=[Город]',
                      parsedFormula: '=[DP0.D2]',
                    },
                    style_id: 's12',
                  },
                  {
                    id: 'R1.3.2.H1.3',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Dimension',
                      dataType: 'String',
                      formula: '=[Год]',
                      parsedFormula: '=[DP0.D3]]',
                    },
                    style_id: 's12',
                  },
                  {
                    id: 'R1.3.2.H1.4',
                    span: 1,
                    size: { minimalWidth: 40 },
                    expression: {
                      type: 'Measure',
                      dataType: 'String',
                      formula: '=[Продажи]',
                      parsedFormula: '=[DP0.M1]]',
                    },
                    style_id: 's12',
                  },
                ],
              },
            ],
            footerZone: [],
          },
        },
      },
    ],
  },
};
export const reportPageObject = {
  id: 'R1',
  name: 'Отчет 1',
  paginationMode: 'Quick', // Quick | ?
  displayMode: 'Structure', // Data | Structure
  pageSettings: {
    margins: {
      left: 100,
      right: 100,
      top: 100,
      bottom: 100,
    },
    orientation: 'Landscape', // Landscape | Portrait
    height: 1024,
    width: 768,
    recordsHeight: 100,
    recordsWidth: 25,
    scale: 100,
  },
  // structure: {},
  structure: {
    pgHeader: {
      id: 'R1.PH',
      type: 'pgHeader',
      name: 'заголовок страницы',
      size: {
        minimalHeight: 10,
      },
    },
    pgBody: {
      id: 'R1',
      type: 'pgBody',
      name: 'тело',
      size: {
        minimalHeight: 10,
      },
      content: {
        children: [],
      },
    },
    pgFooter: {
      id: 'R1.PF',
      type: 'pgFooter',
      name: 'нижний колонтитул',
      size: {
        minimalHeight: 15,
      },
    },
  },
  alerters: [],
};

export const reportsData = createSlice({
  name: 'reportsData',
  initialState: {
    ...reportObject,
    reports: [reportPageObject], // remove for test reportPageObject
    activeReport: 'R1',
    activeNodes: [],
  },
  reducers: {
    setReportHeader: (state, action) => {
      state.header = action.payload;
    },
    setReportDisplayMode: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );
      report.displayMode = action.payload;
    },
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
        (item) => item.id === state.activeReport,
      );

      report.structure = action.payload;
    },
    setVariables: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      report.variables = action.payload;
    },
    setActiveNodeStyle: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      state.activeNodes.forEach((node) => {
        const reportNode = lodash.find(
          report.structure,
          (item) => item.id === node.id,
        );

        reportNode.styles = { ...reportNode.styles, ...action.payload };
      });
    },
    setActiveNodeFormula: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      const targ = deepObjectSearch({
        target: report.structure,
        key: 'id',
        value: state.activeNodes[0]?.id,
      })[0].target;

      if (targ)
        targ.content = {
          ...targ.content,
          expression: {
            ...targ.content.expression,
            formula: action.payload,
          },
        };
    },
    setTableStyle: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      const { formattingElement } = action.payload;

      if (!formattingElement) return;

      const targ = deepObjectSearch({
        target: report.structure,
        key: 'id',
        value: formattingElement.id,
      })[0].target;

      if (!targ) {
        console.log('targ not found');
        return;
      }

      if (Object.keys(action.payload.styles).length === 0) {
        targ.style = {};
        return;
      }

      targ.style = { ...targ.style, ...action.payload.styles };
    },
    addTableColumn: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );
      const activeNode = state.activeNodes && state.activeNodes[0];
      const currentNode = find(
        report?.structure?.pgBody?.content?.children,
        (item) => item.id === activeNode?.id,
      );
      const headerZone = currentNode?.content?.layout?.zones?.filter(
        (item) => item.vType === 'header',
      );
      const bodyZone = currentNode?.content?.layout?.zones?.filter(
        (item) => item.vType === 'body',
      );

      // const targ = deepObjectSearch({
      //   target: report.structure,
      //   key: 'id',
      //   value: action.payload.id
      // });

      // headerZone[0].cells = [
      //   ...headerZone[0].cells,
      //   { ...action.payload.object }
      // ];

      bodyZone[0].cells = [bodyZone[0].cells, ...action.payload.object];
      headerZone[0].cells = [headerZone[0].cells, ...action.payload.object];

      // if(position === 'before') {
      //   bodyZone[0].cells = [ action.payload.object, ...bodyZone[0].cells];
      //   headerZone[0].cells = [ action.payload.object, ...bodyZone[0].cells];
      // }

      // if(position === 'after') {
      //   bodyZone[0].cells = [ action.payload.object, ...bodyZone[0].cells];
      //   headerZone[0].cells = [ action.payload.object, ...bodyZone[0].cells];
      // }

      // if(position === 'center') {
      //   if(bodyZone[0] && bodyZone[0].cells) {
      //     bodyZone[0].cells =  bodyZone[0].cells.map(cell => {
      //       if(cell.id === action.payload.object.id) {
      //         return action.payload.object
      //       }
      //       return cell
      //     })
      //   }

      //   if(headerZone[0] && headerZone[0].cells) {
      //     headerZone[0].cells =  headerZone[0].cells.map(cell => {
      //       if(cell.id === action.payload.object.id) {
      //         return action.payload.object
      //       }
      //       return cell
      //     })
      //   }

      // }

      // console.log(report, report.structure, targ);
      // TODO изменить запись яколонки по дропнутой позиции
      // reportNode.columns = [...reportNode.columns, action.payload.column];
    },
    removeTableColumn: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );
      const activeNode = state.activeNodes && state.activeNodes[0];
      const currentNode = find(
        report?.structure?.pgBody?.content?.children,
        (item) => item.id === activeNode?.id,
      );
      const headerZone = currentNode?.content?.layout?.zones?.filter(
        (item) => item.vType === 'header',
      );
      const bodyZone = currentNode?.content?.layout?.zones?.filter(
        (item) => item.vType === 'body',
      );
      headerZone[0].cells = headerZone[0].cells.filter(
        (item) => item.col !== action.payload.object.col,
      );
      bodyZone[0].cells = bodyZone[0].cells.filter(
        (item) => item.col !== action.payload.object.col,
      );
    },
    addTableRow: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      const reportNode = lodash.find(
        report.structure,
        (item) => item.id === action.payload.id,
      );

      reportNode.rows = [...reportNode.rows, action.payload.row];
    },
    addTableValue: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      const reportNode = lodash.find(
        report.structure,
        (item) => item.id === action.payload.id,
      );

      reportNode.values = [...reportNode.values, action.payload.value];
    },
    addSortingField: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );

      const reportNode = lodash.find(
        report.structure,
        (item) => item.id === action.payload.id,
      );

      reportNode.sorting = action.payload.sorting;
    },
    setTableVariant: (state, action) => {
      const report = lodash.find(
        state.reports,
        (item) => item.id === state.activeReport,
      );
      const activeNode = state.activeNodes[0];
      const currentNode = find(
        report.structure?.pgBody?.content?.children,
        (item) => item.id === activeNode?.id,
      );
      currentNode.type = action.payload;
      // state.activeNodes.forEach(node => {
      //   const reportNode = lodash.find(
      //     report.structure,
      //     item => item.id === node.id
      //   );

      //   reportNode.variant = action.payload;
      // });
    },
  },
});

export const {
  setReportHeader,
  removeTableColumn,
  setReportDisplayMode,
  setActiveReport,
  setActiveNodes,
  setReports,
  setStructure,
  setVariables,
  setActiveNodeStyle, // TODO: delete if useless
  setActiveNodeFormula,
  setTableStyle,
  addTableColumn, // TODO: delete if useless
  addSortingField,
  setTableVariant,
  addTableRow, // TODO: delete if useless
  addTableValue, // TODO: delete if useless
} = reportsData.actions;
