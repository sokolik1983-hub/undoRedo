import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import useClickOutside from '../../helpers/useClickOutside';

const Dropdown = (props) => {
  const { className, mainButton, children } = props;
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  const clickRef = useRef();
  useClickOutside(clickRef, () => setIsOpened(false));

  return (
    <div className={styles.wrapper} ref={clickRef}>
      <div
        className={className}
        onClick={toggleMenu}
      >
        {mainButton}
        { isOpened && children }
      </div>
    </div>
  )
};

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mainButton: PropTypes.node,
}