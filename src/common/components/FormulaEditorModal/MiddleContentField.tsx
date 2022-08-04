import React, { FC, useState } from 'react';

import { ICON_POSITION } from '../../../common/components/Search/constant';
import Search from '../Search';
import styles from './FormulaEditorModal.module.scss';

interface IMiddleContentProps {
  fields: Array<any>;
}

const MiddleContent: FC<IMiddleContentProps> = ({ fields }) => {
  const [filterableFields, setFilterableFields] = useState(fields);

  const [value, setValue] = useState('');

  console.log(filterableFields);

  const handleSearch =
    (arr: Array<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setValue(value);
      setFilterableFields(
        //@ts-ignore
        arr?.filter((i) => {
          return i?.name?.toLowerCase().includes(value?.toLowerCase());
        }),
      );
    };

  return (
    <div className={styles.sqlTables}>
      <span className={styles.tableName}>Объекты</span>
      <Search
        value={value}
        onChange={handleSearch(fields)}
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
              {column.option}
            </option>
          ))}
        </>
      </select>
    </div>
  );
};

export default MiddleContent;
