import isEqual from 'lodash/isEqual';

import { deepObjectSearch } from '../../../../../data/helpers';
import { getElementData } from '../../../../../data/reportDesigner/reportsData/reportsDataActions';
import { setFormattingElement } from '../../../../../data/reportDesigner/reportsUi/reportDesignerUIReducer';

export const structureUpdatedChecker = () => {
  let oldZones;

  return (newZones) => {
    const end = (bool) => {
      oldZones = newZones?.slice();
      return bool;
    };

    if (!oldZones) {
      return end(true);
    }

    if (!newZones) {
      return end(true);
    }

    const whitelist = ['expression'];

    if (oldZones.length !== newZones.length) {
      return end(true);
    }

    for (const newZone of newZones) {
      const oldZoneSearch = deepObjectSearch({
        target: oldZones,
        key: 'id',
        value: newZone.id,
      });

      if (!oldZoneSearch[0] || !oldZoneSearch[0].target) {
        return end(true);
      }

      const oldZone = oldZoneSearch[0].target;

      const oldCells = oldZone.cells;
      const newCells = newZone.cells;

      if (!oldCells || !newCells || oldCells.length !== newCells.length) {
        return end(true);
      }

      for (let newCell of newCells) {
        const oldCell = oldCells.find((item) => item.id === newCell.id);

        if (!oldCell) {
          return end(true);
        }

        for (let key of whitelist) {
          const isSame = isEqual(newCell[key], oldCell[key]);

          if (!isSame) {
            // console.log(newCell[key], oldCell[key]);

            return end(true);
          }
        }
      }
    }

    return end(false);
  };
};

export const getZoneData = ({
  zones,
  dispatch,
  resetFn,
  callback,
  report_id = 'R1',
}) => {
  for (let i = 0; i < zones.length; i++) {
    const currentKey = zones[i].id;
    resetFn(currentKey);

    dispatch(
      getElementData(
        { report_id, element_id: currentKey },
        callback(currentKey),
      ),
    );
  }
};

export const selectCell = (dispatch) => (item) =>
  dispatch(setFormattingElement({ item }));
