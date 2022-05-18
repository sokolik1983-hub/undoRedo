import { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';

/**
 * @param props - смотри документацию https://www.npmjs.com/package/rc-dropdown
 */

const Dropdown = ({
  children,
  trigger,
  overlay,
  placement,
  alignPoint,
  ...props
}) => {
  const child = Children.only(children);
  const dropdownTrigger = cloneElement(child, {});

  return (
    <RcDropdown
      {...props}
      trigger={trigger}
      overlay={<div>{overlay}</div>}
      placement={placement}
      alignPoint={alignPoint}
      // TODO: add 'dropdown' as prefix to root class, add styles for apearence animation
      // prefixCls="dropdown"
      destroyPopupOnHide
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.array,
  overlay: PropTypes.node,
  placement: PropTypes.string,
  alignPoint: PropTypes.bool
};
