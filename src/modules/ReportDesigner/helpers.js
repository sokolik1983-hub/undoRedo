import lodash from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export function getCurrentReport(array, id) {
  return lodash.find(array, item => item.id === id);
}

export function isActiveNode(array, id) {
  return lodash.find(array, item => item.id === id);
}

export const generateId = () => Date.parse(new Date());

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
