import { useState, useRef } from 'react';
import cn from 'clsx';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import useClickOutside from '../../helpers/useClickOutside';

const Dropdown = props => {
  const { className, mainButton, children, itemsWrapper } = props;
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => setIsOpened(false));

  return (
    <div className={styles.wrapper} ref={clickRef}>
      <div className={cn(styles.mainButton, className)} onClick={toggleMenu}>
        {mainButton}
        <div className={cn(styles.itemsWrapper, itemsWrapper)}>
          {isOpened && children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mainButton: PropTypes.node,
  itemsWrapper: PropTypes.string
};
