/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import Cell from '../../../Cell';
import styles from './TableFooter.module.scss';

const TableFooter = ({ data, displayMode, reportData, ...props }) => {
  const { dpData, dpObjects } = reportData;

  if (!data || data.length === 0) return null;

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
            <td key={item.id}>
              <Cell
                blockStyles={item.styles}
                structureItem={item}
                id={item.id}
              />
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <tfoot className={styles.root}>
      {displayMode === 'Formula' ? renderFormula() : renderData()}
    </tfoot>
  );
};

export default TableFooter;
