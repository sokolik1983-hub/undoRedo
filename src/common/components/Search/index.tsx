import clsx from 'clsx';
import React, { ChangeEvent, FC } from 'react';

import Magnifier from '../../../layout/assets/magnifier.svg';
import IconButton from '../IconButton';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';
import { ICON_POSITION } from './constant';
import styles from './Search.module.scss';

interface ISearchProps {
  className?: string;
  onSubmit?: () => void;
  value: string;
  onChange: (el: ChangeEvent<HTMLInputElement>) => void;
  iconButtonPosition?: string;
}

const Search: FC<ISearchProps> = ({
  className,
  onSubmit,
  value,
  onChange,
  iconButtonPosition,
}) => {
  const classes = clsx(styles.searchForm, className);
  const inputClasses = clsx(styles.searchInput, className);

  const getIconButton = () => {
    return (
      <Tooltip placement="topLeft" overlay="Поиск">
        <IconButton className={styles.btn} icon={<Magnifier />} type="submit" />
      </Tooltip>
    );
  };

  return (
    <form className={classes} onSubmit={onSubmit}>
      {iconButtonPosition === ICON_POSITION.LEFT && getIconButton()}
      <TextInput
        className={inputClasses}
        id="search"
        value={value}
        onChange={onChange}
      />
      {iconButtonPosition === ICON_POSITION.RIGHT && getIconButton()}
    </form>
  );
};

export default Search;
