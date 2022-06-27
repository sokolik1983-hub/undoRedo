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

  const defaultCellStyle = {
    width: 100,
    height: 40
  }

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
            id: generateId(),
            shown: true,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.B.1`,
                row: 2,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: generateId(),
            shown: true,
            vType: 'body'
          },
          {
            cells: [

            ],
            hType: 'header',
            id: generateId(),
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
            id: generateId(),
            shown: true,
            vType: 'header'
          },
          {
            cells: [
              {
                col: 1,
                expression: {},
                id: `${generateId()}.B.1`,
                row: 2,
                size: {
                  minimalHeight: 12,
                  minimalWidth: 100
                },
                style: defaultCellStyle
              }
            ],
            hType: 'header',
            id: generateId(),
            shown: true,
            vType: 'body'
          },
          {
            cells: [

            ],
            hType: 'header',
            id: generateId(),
            shown: false,
            vType: 'footer'
          }
        ]
      }
    },
    id: generateId(),
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
            cells: [],
            hType: 'header',
            id: generateId(),
            shown: true,
            vType: 'header'
          },
          {
            cells: [],
            hType: 'header',
            id: generateId(),
            shown: true,
            vType: 'body'
          },
          {
            cells: [],
            hType: 'header',
            id: generateId(),
            shown: false,
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
    type: 'vTable'
  };

  const mapper = {
    cell,
    hTable,
    vTable,
    xTable
  };

  return mapper[type];
};
