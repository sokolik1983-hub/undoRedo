import cn from 'clsx';
import React, { FC, ReactNode } from 'react';

import styles from './Dropdown.module.scss';

interface IDropdownItemProps {
  className?: string;
  onClick: (el: string) => void;
  children?: ReactNode;
  iconClassName?: string;
  item: Item;
}

export interface Item {
  icon?: ReactNode;
  text?: string | null;
  action: string;
  value?: string;
}

const DropdownItem: FC<IDropdownItemProps> = ({
  className,
  onClick,
  children,
  iconClassName,
  item,
  ...props
}) => {
  const { action, text, icon } = item;

  const handleClick = () => {
    onClick(action);
  };

  return (
    <div
      {...props}
      className={cn(styles.dropDownItem, className)}
      onClick={handleClick}
    >
      {icon && <div className={cn(styles.icon, iconClassName)}>{icon}</div>}
      {children || text}
    </div>
  );
};

export default DropdownItem;
