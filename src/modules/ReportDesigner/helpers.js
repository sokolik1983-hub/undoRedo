import lodash from 'lodash';
import uuid from 'react-uuid';

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
    id: uuid(),
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
                id: `${uuid()}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.H`,
            shown: true,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.B`,
            shown: true,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.F`,
            shown: false,
            vType: 'footer',
          },
        ],
      },
    },
    id: uuid(),
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
                id: `${uuid()}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.H`,
            shown: true,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.B`,
            shown: true,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.F`,
            shown: false,
            vType: 'footer',
          },
        ],
      },
    },
    id: `${uuid()}`,
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
                id: `${uuid()}.HH.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.HH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.BH.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'body',
            id: `${uuid()}.BH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.FH.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${uuid()}.FH`,
            shown: 1,
            vType: 'header',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.HB.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.HB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.BB.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'body',
            id: `${uuid()}.BB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.FB.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${uuid()}.FB`,
            shown: 1,
            vType: 'body',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.HF.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                },
                style: defaultCellStyle,
              },
            ],
            hType: 'header',
            id: `${uuid()}.HF`,
            shown: 1,
            vType: 'footer',
          },
          {
            cells: [
              {
                col: 1,
                id: `${uuid()}.BF.1_1`,
                row: 1,
                style: defaultCellStyle,
                expression: defaultExpression,
              },
            ],
            hType: 'body',
            id: `${uuid()}.BF`,
            shown: 1,
            vType: 'footer',
          },
          {
            cells: [
              {
                col: 1,
                expression: defaultExpression,
                id: `${uuid()}.FF.1_1`,
                row: 1,
                style: defaultCellStyle,
              },
            ],
            hType: 'footer',
            id: `${uuid()}.FF`,
            shown: 1,
            vType: 'footer',
          },
        ],
      },
    },
    id: uuid(),
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
    id: uuid(),
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
    id: uuid(),
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
    id: uuid(),
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
