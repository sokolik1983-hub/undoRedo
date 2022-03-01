import PropTypes from 'prop-types'
import cn from 'clsx';
import styles from './Dropdown.module.scss';

const DropdownItem = ({ className, onClick, title, icon, children, text }) => {

  return (
    <div
      className={cn(styles.dropDownItem, className)}
      onClick={(e) => onClick(e)}
      title={title}
    >
      { icon && (
        <div className={styles.icon}>
          { icon }
        </div>
      ) }
      { children || text }
    </div>
  )
};

export default DropdownItem;

DropdownItem.prototype = {

}

DropdownItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired
}