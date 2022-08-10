import clsx from 'clsx';
import React, { FC, ReactNode, useState } from 'react';

import { ICON_POSITION } from '../../../common/components/Search/constant';
import FunctionIcon from '../../../layout/assets/reportDesigner/function.svg';
import { getIconByItemType } from '../../../modules/QueryPanel/queryPanelHelper';
import Search from '../Search';
import styles from './FormulaEditorModal.module.scss';

interface IMiddleContentProps {
  fields: Array<any>;
  title: string;
  object?: ReactNode;
  operator?: ReactNode;
  func?: ReactNode;
  className?: string;
}

const MiddleContent: FC<IMiddleContentProps> = ({
  fields,
  className,
  title,
  object,
  func,
  operator,
}) => {
  const [filterableFields, setFilterableFields] = useState(fields);
  const [value, setValue] = useState('');

  const classes = clsx(styles.wrapper, className);

  const handleSearch =
    (arr: Array<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setValue(value);
      setFilterableFields(
        //@ts-ignore
        operator
          ? arr?.filter((i) => {
              return i?.text?.toLowerCase().includes(value?.toLowerCase());
            })
          : arr?.filter((i) => {
              return i?.name?.toLowerCase().includes(value?.toLowerCase());
            }),
      );
    };

  return (
    <div className={classes}>
      <span className={styles.tableName}>{title}</span>
      <Search
        value={value}
        onChange={handleSearch(fields)}
        className={styles.search}
        inputClassName={styles.input}
        fullWidth
        iconStyle={styles.searchIcon}
        iconButtonPosition={ICON_POSITION.RIGHT}
      />
      <div className={styles.column}>
        {filterableFields.map((column) => (
          <div key={column.id} className={styles.name}>
            {object ? (
              <span className={styles.itemIcon}>
                {getIconByItemType(column.type)}
              </span>
            ) : func ? (
              <span className={styles.itemIcon}>
                <FunctionIcon />
              </span>
            ) : (
              <></>
            )}
            {operator ? column.text : column.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleContent;
