import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Dropdown from '../Dropdown';
import Tooltip from '../Tooltip';
import styles from './Option.module.scss';
import { useSelectContext } from './Select';

const Option = ({
  children,
  className,
  icon,
  value,
  secondaryText,
  withTooltip,
  contextMenu
}) => {
  const { onOptionChange } = useSelectContext();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const textRef = useRef();

  const handleVisibility = visible => {
    const isNeedToDisplay =
      textRef?.current?.scrollWidth > textRef?.current?.offsetWidth;
    if (isNeedToDisplay) setIsTooltipVisible(true);
    if (!visible) setIsTooltipVisible(false);
  };

  const handleClick = () =>
    onOptionChange({
      currentValue: value,
      currentIcon: icon,
      text: children
    });

  const option = clsx(styles.option, className);

  return (
    <Dropdown
      trigger={contextMenu && ['contextMenu']}
      overlay={contextMenu}
      alignPoint
    >
      <Tooltip
        placement="topLeft"
        overlay={<div className={styles.tooltip}>{value}</div>}
        visible={withTooltip && isTooltipVisible}
        onVisibleChange={handleVisibility}
        mouseEnterDelay={0.5}
      >
        <div className={option} onClick={handleClick}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <div className={styles.textContainer}>
            <span ref={textRef} className={styles.text}>
              {children}
            </span>
            <span className={styles.secondaryText}>{secondaryText}</span>
          </div>
        </div>
      </Tooltip>
    </Dropdown>
  );
};

export default Option;

Option.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  icon: PropTypes.node,
  withTooltip: PropTypes.bool,
  contextMenu: PropTypes.node
};
