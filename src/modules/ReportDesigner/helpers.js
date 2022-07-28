import lodash from 'lodash';
import uuid from 'uuid';

export const generateId = () => String(Date.parse(new Date()));
const elemId = uuid();

export function getCurrentReport(array, id) {
  return lodash.find(array, (item) => item.id === id);
}

export function isActiveNode(array, id) {
  return lodash.find(array, (item) => item.id === id);
}

export function setTableStyles(reportStructure, reportsUi, style) {
  return lodash.cloneDeep(reportStructure).map((item) => {
    const selectedCols = reportsUi?.ui.selectedColumns[item.id];

    if (selectedCols) {
      selectedCols.forEach((col) => {
        const currentColumn = lodash.find(
          item.columns,
          (it) => it.object.id === col,
        );
        currentColumn.cells.styles = {
          ...currentColumn.cells.styles,
          ...style,
        };
        currentColumn.header.styles = {
          ...currentColumn.header.styles,
          ...style,
        };
      });
    }

    return item;
  });
}

const defaultExpression = {
  dataType: 'String',
  formula: '',
  type: 'Const',
};

export const createReportElement = ({ type, mousePosition, length }) => {
  const { x, y } = mousePosition;

  const defaultCellStyle = {};

  const cell = {
    id: elemId,
    type: 'cell',
    name: `блок ${length}`,
    size: {
      minimalHeight: 10,
      minimalWidth: 120,
      autofitWidth: false,
      autofitHeight: false,
    },
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y,
    },
    style: defaultCellStyle,
    content: {},
  };

  const hTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.H`,
            shown: true,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.B`,
            shown: true,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.F`,
            shown: false,
            vType: 'footer',
          },
        ],
      },
    },
    id: elemId,
    name: `блок ${length}`,
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10,
    },
    type: 'hTable',
  };

  const vTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.H`,
            shown: true,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.B`,
            shown: true,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.F`,
            shown: false,
            vType: 'footer',
          },
        ],
      },
    },
    id: elemId,
    name: `блок ${length}`,
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10,
    },
    type: 'vTable',
  };

  const xTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.HH.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.HH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.BH.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'body',
            id: `${elemId}.BH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.FH.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${elemId}.FH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.HB.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.HB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.BB.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'body',
            id: `${elemId}.BB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.FB.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${elemId}.FB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.HF.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${elemId}.HF`,
            shown: 1,
            vType: 'footer',
          },
          {
            cells: [
              {
                col: 1,
                id: `${elemId}.BF.1_1`,
                row: 1,
                style: defaultCellStyle,
                expression: defaultExpression,
              },
            ],
            hType: 'body',
            id: `${elemId}.BF`,
            shown: 1,
            vType: 'footer',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${elemId}.FF.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${elemId}.FF`,
            shown: 1,
            vType: 'footer',
          },
        ],
      },
    },
    id: elemId,
    name: `блок ${length}`,
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10,
    },
    type: 'xTable',
  };

  const barChart = {
    id: elemId,
    type: 'barChart',
    name: `блок ${length}`,
    size: {
      minimalHeight: 250,
      minimalWidth: 250,
      autofitWidth: false,
      autofitHeight: false,
    },
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y,
    },
    content: {},
  };

  const lineChart = {
    id: elemId,
    type: 'lineChart',
    name: `блок ${length}`,
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y,
    },
    content: {},
  };

  const pieChart = {
    id: elemId,
    type: 'pieChart',
    name: `блок ${length}`,
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y,
    },
    content: {},
  };

  const mapper = {
    cell,
    hTable,
    vTable,
    xTable,
    barChart,
    lineChart,
    pieChart,
  };

  return mapper[type];
};
