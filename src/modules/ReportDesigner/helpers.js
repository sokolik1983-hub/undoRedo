import lodash from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function getCurrentReport(array, id) {
  return lodash.find(array, item => item.id === id);
}

export function isActiveNode(array, id) {
  return lodash.find(array, item => item.id === id);
}

export const generateId = () => String(Date.parse(new Date()));

export function setTableStyles(reportStructure, reportsUi, style) {
  return lodash.cloneDeep(reportStructure).map(item => {
    const selectedCols = reportsUi?.ui.selectedColumns[item.id];

    if (selectedCols) {
      selectedCols.forEach(col => {
        const currentColumn = lodash.find(
          item.columns,
          it => it.object.id === col
        );
        currentColumn.cells.styles = {
          ...currentColumn.cells.styles,
          ...style
        };
        currentColumn.header.styles = {
          ...currentColumn.header.styles,
          ...style
        };
      });
    }

    return item;
  });
}

export const createReportElement = ({ type, mousePosition }) => {
  const { x, y } = mousePosition;

  const defaultCellStyle = {};

  const cell = {
    id: generateId(),
    type: 'cell',
    name: `ячейка ${generateId()}`,
    size: {
      minimalHeight: 10,
      minimalWidth: 120,
      autofitWidth: false,
      autofitHeight: false
    },
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y
    },
    style: defaultCellStyle,
    content: {}
  };

  const hTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.H`,
            shown: true,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.B`,
            shown: true,
            vType: 'body'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.F`,
            shown: false,
            vType: 'footer'
          }
        ]
      }
    },
    id: generateId(),
    name: 'горизонтальная таблица',
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10
    },
    type: 'hTable'
  };

  const vTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,

                id: `${generateId()}.H.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.H`,
            shown: true,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,

                id: `${generateId()}.B.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.B`,
            shown: true,
            vType: 'body'
          },
          {
            cells: [
              {
                col: 1,

                id: `${generateId()}.F.1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.F`,
            shown: false,
            vType: 'footer'
          }
        ]
      }
    },
    id: `${generateId()}`,
    name: 'вертикальная таблица',
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10
    },
    type: 'vTable'
  };

  const xTable = {
    content: {
      layout: {
        zones: [
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.HH.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.HH`,
            shown: 1,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.BH.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70
                },
                style: defaultCellStyle
              }
            ],
            hType: 'body',
            id: `${generateId()}.BH`,
            shown: 1,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.FH.1_1`,
                row: 1,
                style: defaultCellStyle
              }
            ],
            hType: 'footer',
            id: `${generateId()}.FH`,
            shown: 1,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.HB.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.HB`,
            shown: 1,
            vType: 'body'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.BB.1_1`,
                row: 1,
                size: {
                  minimalWidth: 70
                },
                style: defaultCellStyle
              }
            ],
            hType: 'body',
            id: `${generateId()}.BB`,
            shown: 1,
            vType: 'body'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.FB.1_1`,
                row: 1,
                style: defaultCellStyle
              }
            ],
            hType: 'footer',
            id: `${generateId()}.FB`,
            shown: 1,
            vType: 'body'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.HF.1_1`,
                row: 1,
                size: {
                  minimalHeight: 12
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: `${generateId()}.HF`,
            shown: 1,
            vType: 'footer'
          },
          {
            cells: [
              {
                col: 1,
                id: `${generateId()}.BF.1_1`,
                row: 1,
                style: defaultCellStyle
              }
            ],
            hType: 'body',
            id: `${generateId()}.BF`,
            shown: 1,
            vType: 'footer'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.FF.1_1`,
                row: 1,
                style: defaultCellStyle
              }
            ],
            hType: 'footer',
            id: `${generateId()}.FF`,
            shown: 1,
            vType: 'footer'
          }
        ]
      }
    },
    id: generateId(),
    name: 'кросс таблица',
    position: { x, xType: 'Absolute', y, yType: 'Absolute' },
    size: {
      autofitHeight: false,
      autofitWidth: false,
      minimalHeight: 10
    },
    type: 'xTable'
  };

  const barChart = {
    id: generateId(),
    type: 'barChart',
    name: `столбчатый график ${generateId()}`,
    size: {
      minimalHeight: 250,
      minimalWidth: 250,
      autofitWidth: false,
      autofitHeight: false
    },
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y
    },
    content: {}
  };

  const lineChart = {
    id: generateId(),
    type: 'lineChart',
    name: `линейный график ${generateId()}`,
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y
    },
    content: {}
  };

  const pieChart = {
    id: generateId(),
    type: 'pieChart',
    name: `круговая диаграмма ${generateId()}`,
    position: {
      xType: 'Absolute',
      yType: 'Absolute',
      x,
      y
    },
    content: {}
  };

  const mapper = {
    cell,
    hTable,
    vTable,
    xTable,
    barChart,
    lineChart,
    pieChart
  };

  return mapper[type];
};
