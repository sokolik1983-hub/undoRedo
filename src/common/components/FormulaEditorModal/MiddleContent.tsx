import React, { FC, useEffect, useState } from 'react';

import { ICON_POSITION } from '../../../common/components/Search/constant';
import {
  SQL_OPERATORS,
  TABLE1_EXAMPLE,
  TABLE2_EXAMPLE,
} from '../../../common/constants/universes';
import Search from '../Search';
import styles from './FormulaEditorModal.module.scss';

interface IMiddleContentProps {
  objectVal: string;
  operatorVal: string;
  formulaVal: string;
  setObjectVal: (el: string) => void;
  setOperatorVal: (el: string) => void;
  setFormulaVal: (el: string) => void;
}

const MiddleContent: FC<IMiddleContentProps> = ({
  objectVal,
  operatorVal,
  formulaVal,
  setObjectVal,
  setOperatorVal,
  setFormulaVal,
}) => {
  const [filterableFields, setFilterableFields] = useState(
    TABLE1_EXAMPLE.columns,
  );

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFilterableFields(TABLE1_EXAMPLE.columns);
  //   }, 50);
  // }, [TABLE1_EXAMPLE.columns]);

  console.log(filterableFields);

  const handleSearch =
    (arr: Array<any>, setFunc: (val: string) => void) => (e: any) => {
      const { value } = e.target;

      setFunc(value);
      setFilterableFields(
        //@ts-ignore
        arr?.filter((i) => {
          return i?.name?.toLowerCase().includes(value?.toLowerCase());
        }),
      );
    };

  return (
    <div className={styles.sqlMainContent}>
      <div className={styles.sqlTables}>
        <span className={styles.tableName}>Объекты</span>
        <Search
          value={objectVal}
          onChange={handleSearch(TABLE1_EXAMPLE.columns, setObjectVal)}
          className={styles.search}
          inputClassName={styles.input}
          fullWidth
          iconStyle={styles.searchIcon}
          iconButtonPosition={ICON_POSITION.RIGHT}
        />
        <select className={styles.selectColumn} multiple>
          <>
            {filterableFields.map((column) => (
              <option value={column.id} className={styles.tableColumnName}>
                {column.name}
              </option>
            ))}
          </>
        </select>
      </div>
      <div className={styles.sqlOperators}>
        <span className={styles.tableName}>Операторы</span>
        <Search
          value={operatorVal}
          onChange={handleSearch(SQL_OPERATORS, setOperatorVal)}
          className={styles.search}
          inputClassName={styles.input}
          fullWidth
          iconStyle={styles.searchIcon}
          iconButtonPosition={ICON_POSITION.RIGHT}
        />
        {/* <select className={styles.selectColumn} multiple>
          {filterableFields.map((item) => (
            <option value={item.action}>{item.text}</option>
          ))}
        </select> */}
      </div>
      <div className={styles.sqlFunctions}>
        <span className={styles.tableName}>Функции</span>
        <Search
          value={formulaVal}
          onChange={handleSearch(TABLE2_EXAMPLE.columns, setFormulaVal)}
          className={styles.search}
          inputClassName={styles.input}
          iconStyle={styles.searchIcon}
          iconButtonPosition={ICON_POSITION.RIGHT}
        />
        <select className={styles.selectColumn} multiple>
          {filterableFields.map((column) => (
            <option value={column.id}>{column.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MiddleContent;
