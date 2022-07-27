import 'rc-dropdown/assets/index.css';

import RcDropdown from 'rc-dropdown';
import { DropdownProps } from 'rc-dropdown/lib/Dropdown';
import React, { Children, FC, ReactElement, cloneElement } from 'react';

import styles from './Dropdown.module.scss';

/**
 * @param props - смотри документацию https://www.npmjs.com/package/rc-dropdown
 */

type Placement =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'top'
  | 'bottom';

interface Align {
  points?: [string, string];
  offset?: [number, number];
  targetOffset?: [number, number];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
}

interface IDropdownProps extends DropdownProps {
  children: ReactElement;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay?: ReactElement | (() => ReactElement);
  placement?: Placement;
  alignPoint?: boolean;
  align?: Align;
  destroyPopupOnHide?: boolean;
}

const Dropdown: FC<IDropdownProps> = ({
  children,
  trigger,
  overlay,
  placement,
  alignPoint,
  align,
  destroyPopupOnHide = true,
  ...props
}) => {
  const child = Children.only(children);
  const dropdownTrigger = cloneElement(child, {});

  return (
    <RcDropdown
      overlayClassName={styles.overlay}
      trigger={trigger}
      overlay={<div>{overlay}</div>}
      placement={placement}
      alignPoint={alignPoint}
      align={align}
      // TODO: add 'dropdown' as prefix to root class, add styles for apearence animation and type destroyPopupOnHide prop
      // prefixCls="dropdown"
      // destroyPopupOnHide={destroyPopupOnHide}
      {...props}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

export default Dropdown;
