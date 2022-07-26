import 'rc-tooltip/assets/bootstrap.css';

import clsx from 'clsx';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import React, { FC, ReactElement } from 'react';

import styles from './Tooltip.module.scss';

/**
 * @param props - смотри документацию https://www.npmjs.com/package/rc-tooltip
 */

type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

interface ITooltipProps extends TooltipProps {
  children: ReactElement;
  placement?: Placement;
  className?: string;
}

const Tooltip: FC<ITooltipProps> = ({
  children,
  placement = 'bottomLeft',
  className,
  ...props
}) => {
  const overlayClassName = clsx(styles.overlay, className);

  return (
    <RcTooltip
      overlayClassName={overlayClassName}
      destroyTooltipOnHide
      placement={placement}
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
      {...props}
    >
      {children}
    </RcTooltip>
  );
};

export default Tooltip;
