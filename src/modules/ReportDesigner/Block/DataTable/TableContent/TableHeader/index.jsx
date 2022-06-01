/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import Cell from '../../../Cell';
import styles from './TableHeader.module.scss';

const TableHeader = ({ data, displayMode, reportData, ...props }) => {
  const renderCells = () => {
    return data?.map(zone => {
      return (
        <tr>
          {zone?.cells?.map(item => {
            return (
              <th key={item.id}>
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
