import clsx from 'clsx';
import React, { ChangeEvent, FC } from 'react';

import Magnifier from '../../../layout/assets/reportObjectsPanelIcons/magnifier.svg';
import IconButton from '../IconButton';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';
import { ICON_POSITION } from './constant';
import styles from './Search.module.scss';

interface ISearchProps {
  className?: string;
  inputClassName?: string;
  iconStyle?: string;
  onSubmit?: () => void;
  value: string;
  fullWidth?: boolean;
  onChange: (el: ChangeEvent<HTMLInputElement>) => void;
  iconButtonPosition?: string;
}

const Search: FC<ISearchProps> = ({
  value,
  className,
  inputClassName,
  iconStyle,
  onChange,
  iconButtonPosition,
}) => {
  const classes = clsx(styles.searchForm, className);
  const inputClasses = clsx(styles.searchInput, inputClassName);

  const getIconButton = () => {
    return (
      <Tooltip placement="topLeft" overlay="Поиск" trigger={['hover']}>
        <IconButton
          className={styles.btn}
          iconStyle={iconStyle}
          icon={<Magnifier />}
          type="submit"
        />
      </Tooltip>
    );
  };

  return (
    <div className={classes}>
      {iconButtonPosition === ICON_POSITION.LEFT && getIconButton()}
      <TextInput
        className={inputClasses}
        id="search"
        value={value}
        onChange={onChange}
        fullWidth
      />
      {iconButtonPosition === ICON_POSITION.RIGHT && getIconButton()}
    </div>
  );
};

export default Search;
