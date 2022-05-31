/* eslint-disable react/no-array-index-key */
// import styles from './TableBody.module.scss';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { find, findIndex } from 'lodash';

const TableBody = ({ data, reportData, displayMode, variables, ...props }) => {
  console.log(props);
  const { dpData, dpObjects } = reportData;

  const renderFormula = () => {
    return (
      <tr>
        {data?.cells?.map(item => {
          return <th key={item.id}>{item?.expression?.formula}</th>;
        })}
      </tr>
    );
  };

  const renderData = () => {
    return dpData?.map(row => {
      return (
        <tr key={row}>
          {data?.cells?.map(item => {
            const variable = find(
              variables,
              it => it.id === item.expression?.variable_id
            );

            const expressionObjectIndex = findIndex(
              dpObjects,
              it => variable?.parsedFormula.indexOf(it.id) > -1
            );
            debugger;
            return (
              <th key={item.id}>
                {expressionObjectIndex && row[expressionObjectIndex + 1]}
              </th>
            );
          })}
          {/*         
          {row?.map((value, idx) => {
            return <td key={value}>{value}</td>;
          })} */}
        </tr>
      );
    });
  };

  return (
    <tbody>{displayMode === 'Formula' ? renderFormula() : renderData()}</tbody>
  );
};

export default TableBody;
