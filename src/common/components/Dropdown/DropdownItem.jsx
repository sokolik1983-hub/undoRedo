import PropTypes from 'prop-types';
import cn from 'clsx';
import styles from './Dropdown.module.scss';

const DropdownItem = ({
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

DropdownItem.prototype = {};

DropdownItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  item: PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string,
    action: PropTypes.string
  }),
  onClick: PropTypes.func.isRequired
};
