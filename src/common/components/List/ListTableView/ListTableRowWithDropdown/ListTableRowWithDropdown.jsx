import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import useClickOutside from '../../../../helpers/useClickOutside';
import styles from './ListTableRowWithDropdown.module.scss';

const ListTableRowWithDropdown = ({
  children,
  cells,
  onDoubleClick,
  ...props
}) => {
  const clickRef = useRef();
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  useClickOutside(clickRef, () => setIsOpened(false));

  const classes = clsx(styles.tableRow, {
    [styles.active]: isOpened
  });

  const dropdownContainerClasses = clsx(styles.dropdownContainer, {
    [styles.active]: isOpened
  });

  return (
    <tr
      className={classes}
      ref={clickRef}
      onClick={toggleMenu}
      onDoubleClick={onDoubleClick}
      {...props}
    >
      {cells}
      <td className={dropdownContainerClasses}>{isOpened && children}</td>
    </tr>
  );
};

export default ListTableRowWithDropdown;

ListTableRowWithDropdown.propTypes = {
  children: PropTypes.node,
  cells: PropTypes.node,
  onDoubleClick: PropTypes.func
};
