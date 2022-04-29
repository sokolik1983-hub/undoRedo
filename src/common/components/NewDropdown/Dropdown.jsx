/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { cloneElement, useRef, useState } from 'react';
import { EMPTY_STRING } from '../../constants/common';
import { getPoint } from '../NewTooltip/Tooltip';
import Portal from '../Portal/Portal';
import styles from './Dropdown.module.scss';

const Dropdown = ({ className, menu, placement, space, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef();
  const positionRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // const menuContainerStyles = clsx(styles.menuContainer, className);

  const handleClick = e => {
    // setIsVisible(true);
    // positionRef.current = getPoint(
    //   e.currentTarget,
    //   rootRef?.current,
    //   placement,
    //   space
    // );
    setPos(getPoint(e.currentTarget, rootRef?.current, placement, space));
  };

  return (
    <>
      {cloneElement(children, {
        onClick: handleClick
      })}

      <Portal>
        {true && (
          <div
            className={styles.root}
            ref={rootRef}
            style={{
              top: `${pos.y}px`,
              left: `${pos.x}px`
            }}
            // style={{
            //   top: `${positionRef?.current?.y}px`,
            //   left: `${positionRef?.current?.x}px`
            // }}
          >
            {menu}
          </div>
        )}
      </Portal>
    </>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  menu: PropTypes.array,
  placement: PropTypes.oneOf([
    'bottom-left',
    'bottom-middle',
    'bottom-right',
    'top-left',
    'top-middle',
    'top-right',
    'left',
    'right'
  ]),
  space: PropTypes.number
};

Dropdown.defaultProps = {
  className: EMPTY_STRING,
  placement: 'bottom-left',
  space: 0
};
