import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './PanelListItem.module.scss';

const PanelListItem = ({ onClick, name, icon, isFolder }) => {
  const textStyles = clsx(styles.listItemText, {
    [styles.folder]: isFolder
  });
  return (
    <div className={styles.listItem} onClick={onClick}>
      <span className={styles.listItemIcon}>{icon}</span>
      <span className={textStyles}>{name}</span>
    </div>
  );
};

export default PanelListItem;

PanelListItem.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  icon: PropTypes.node,
  isFolder: PropTypes.bool
};
