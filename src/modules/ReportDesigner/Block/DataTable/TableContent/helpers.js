/*eslint-disable */

import { getElementData } from '../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../data/reducers/new_reportDesigner';


export const getZoneData = ({zones, dispatch, resetFn, callback, report_id = 'R1'}) => {

    for (let i = 0; i < zones.length; i++) {
        const currentKey = zones[i].id;
        resetFn(currentKey)

        dispatch(
            getElementData(
              { report_id, element_id: currentKey },
              callback(currentKey)
            )
          );
    }
}

export const selectCell = dispatch => item =>  dispatch(setFormattingElement({ item }));