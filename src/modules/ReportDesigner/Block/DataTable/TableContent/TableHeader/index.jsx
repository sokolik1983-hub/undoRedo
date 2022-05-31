/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import Cell from '../../../Cell';
import styles from './TableHeader.module.scss';

const TableHeader = ({ data, displayMode, reportData, ...props }) => {
  const { dpData, dpObjects } = reportData;

  const renderData = item => {
    const expressionObject = find(
      dpObjects,
      it => item?.expression?.parsedFormula.indexOf(it.id) > -1
    );

    return expressionObject?.name;
  };

  const renderFormula = () => {
    return (
      <tr>
        {data?.cells?.map(item => {
          return (
            <th key={item.id}>
              <Cell
                blockStyles={item.styles}
                structureItem={item}
                id={item.id}
              />
            </th>
          );
        })}
      </tr>
    );
  };

  return (
    <thead>{displayMode === 'Formula' ? renderFormula() : renderData()}</thead>
  );
};

export default TableHeader;
