/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import cn from 'clsx';
import styles from './Dropdown.module.scss';

const DropdownItem = ({ className, onClick, children, item, ...props }) => {
  const { action, text, icon } = item;

  const handleClick = () => {
    onClick(action);
  };

  return (
    <div
      className={cn(styles.dropDownItem, className)}
      onClick={handleClick}
      {...props}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      {children || text}
    </div>
  );
};

export default DropdownItem;

DropdownItem.prototype = {};

DropdownItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  item: PropTypes.objectOf({
    icon: PropTypes.node,
    text: PropTypes.string,
    action: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired
};
