import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useClickOutside from '../../../helpers/useClickOutside';
import styles from './ListItem.module.scss';

const ListItem = ({ name, onDoubleClick, className, icon }) => {
  const [active, setActive] = useState(false);
  const clickRef = useRef();

  useClickOutside(clickRef, () => setActive(false));

  const toggleMenu = () => {
    setActive(!active);
  };

  const classes = clsx(styles.listItem, className, {
    [styles.active]: active
  });

  return (
    <div
      className={classes}
      onDoubleClick={onDoubleClick}
      onClick={toggleMenu}
      ref={clickRef}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default ListItem;

ListItem.propTypes = {
  name: PropTypes.string,
  onDoubleClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node
};
