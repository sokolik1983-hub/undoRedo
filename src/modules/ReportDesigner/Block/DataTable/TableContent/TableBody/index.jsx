/* eslint-disable react/no-array-index-key */
// import styles from './TableBody.module.scss';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { find, findIndex } from 'lodash';
import Cell from '../../../Cell';

const TableBody = ({ data, reportData, displayMode, variables, ...props }) => {
  const renderCells = () => {
    return data?.map(zone => {
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <td key={item.id}>
                <Cell
                  displayMode={displayMode}
                  blockStyles={item.styles}
                  structureItem={item}
                  id={item.id}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return <tbody>{renderCells()}</tbody>;
};

export default TableBody;
