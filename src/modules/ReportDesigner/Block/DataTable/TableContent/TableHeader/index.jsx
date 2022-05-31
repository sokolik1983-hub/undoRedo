/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { find } from 'lodash';
import styles from './TableHeader.module.scss';

const TableHeader = ({ data, displayMode, reportData, ...props }) => {
  const { dpData, dpObjects } = reportData;
  console.log(data, 'data');
  const renderValue = item => {
    if (displayMode === 'Formula') return item?.expression?.formula;
    const expressionObject = find(
      dpObjects,
      it => item?.expression?.parsedFormula.indexOf(it.id) > -1
    );

    return expressionObject?.name;
  };

  return (
    <thead>
      <tr>
        {data?.cells?.map(item => {
          return <th key={item.id}>{item?.expression?.formula}</th>;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
