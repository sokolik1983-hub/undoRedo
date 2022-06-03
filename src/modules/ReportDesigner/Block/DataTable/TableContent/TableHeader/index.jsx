/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getElementData } from '../../../../../../data/actions/newReportDesigner';
import { setFormattingElement } from '../../../../../../data/reducers/new_reportDesigner';
import Cell from '../../../Cell';
import styles from './TableHeader.module.scss';

const TableHeader = ({ data, displayMode, reportData, ...props }) => {
  const dispatch = useDispatch();
  // const [isFetching, setIsFetching] = useState(false);
  // const [response, setResponse] = useState();

  // useEffect(() => {
  //   if (displayMode === 'Data') {
  //     setIsFetching(true);
  //     dispatch(
  //       getElementData({ report_id: 'R1', element_id: data[0].id }, res => {
  //         setIsFetching(false);
  //         setResponse(res);
  //       })
  //     );
  //   }
  // }, [displayMode]);

  const handleClick = (zone, item) => {
    console.log(zone, 'zone');
    console.log(item, 'item');
    dispatch(setFormattingElement({ zone, item }));
  };

  const renderCells = () => {
    return data?.map(zone => {
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <th key={item.id} onClick={() => handleClick('headerZone', item)}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.styles}
                  structureItem={item}
                  id={item.id}
                />
              </th>
            );
          })}
        </tr>
      );
    });
  };

  return <thead>{renderCells()}</thead>;
};

export default TableHeader;
