import PropTypes from 'prop-types';
import clsx from 'clsx';
import RcTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import styles from './Tooltip.module.scss';

/**
 * @param props - смотри документацию https://www.npmjs.com/package/rc-tooltip
 */

const Tooltip = ({ children, placement, className, ...props }) => {
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

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    'left',
    'right',
    'top',
    'bottom',
    'topLeft',
    'leftTop',
    'topRight',
    'rightTop',
    'bottomLeft',
    'leftBottom',
    'bottomRight',
    'rightBottom'
  ]),
  visible: PropTypes.bool
};

Tooltip.defaultProps = {
  placement: 'bottomLeft'
};
