/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import Cell from '../../../Cell';
import styles from './TableFooter.module.scss';

const TableFooter = ({ data, displayMode, reportData, ...props }) => {
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

  return <tfoot className={styles.root}>{renderCells()}</tfoot>;
};

export default TableFooter;
