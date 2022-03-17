/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { cloneElement, useRef, useState } from 'react';
import Portal from '../Portal/Portal';
import styles from './Tooltip.module.scss';

const newPlacement = position => ({
  current: position,
  flip() {
    if (this.current === 'left') return 'right';
    if (this.current === 'right') return 'left';
    if (this.current === 'top-left') return 'top-right';
    if (this.current === 'top-right') return 'top-left';
    if (this.current === 'bottom-left') return 'bottom-right';
    if (this.current === 'bottom-right') return 'bottom-left';
  }
});

const getPoint = (elem, tooltip, placement, space) => {
  const point = { x: 0, y: 0 };
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  const boundaries = {
    top: space,
    bottom: window.innerHeight - elem.offsetHeight - space,
    left: space,
    right: window.innerWidth - elem.offsetWidth - space
  };

  switch (placement) {
    case 'top-left': {
      point.x = left;
      point.y = top - tooltip.offsetHeight - space;
      break;
    }
    case 'top-right': {
      point.x = right - tooltip.offsetWidth;
      point.y = top - tooltip.offsetHeight - space;
      break;
    }
    case 'bottom-right': {
      point.x = right - tooltip.offsetWidth;
      point.y = top + tooltip.offsetHeight + space;
      break;
    }
    case 'left': {
      point.x = left - tooltip.offsetWidth - space;
      point.y = top + (elem.offsetHeight - tooltip.offsetHeight) / 2;
      break;
    }
    case 'right': {
      point.x = right + space;
      point.y = top + (elem.offsetHeight - tooltip.offsetHeight) / 2;
      break;
    }
    default:
      // bottom-left is default
      point.x = left;
      point.y = bottom + space;
  }

  // if (
  //   ((placement === 'left' || placement === 'right') &&
  //     (point.x > boundaries.right || point.x < boundaries.left)) ||
  //   ((placement === 'top' || placement === 'bottom') &&
  //     (point.y > boundaries.bottom || point.y < boundaries.top))
  // )
  //   getPoint(elem, tooltip, newPlacement(placement), space);

  return point;
};

const Tooltip = ({ text, placement, space, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();

  const tooltipClasses = clsx(styles.tooltip, {
    [styles.visible]: isVisible
  });

  const handleMouseOver = e => {
    setIsVisible(true);
    positionRef.current = getPoint(
      e.currentTarget,
      tooltipRef?.current,
      placement,
      space
    );
  };

  return (
    <>
      {cloneElement(children, {
        onMouseOver: handleMouseOver,
        onMouseOut: () => setIsVisible(false)
      })}

      <Portal>
        <span
          className={tooltipClasses}
          style={{
            top: `${positionRef?.current?.y}px`,
            left: `${positionRef?.current?.x}px`
          }}
          ref={tooltipRef}
          positionRef={positionRef}
        >
          {text}
        </span>
      </Portal>
    </>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  placement: PropTypes.oneOf([
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
    'left',
    'right'
  ]),
  space: PropTypes.any
};

Tooltip.defaultProps = {
  placement: 'bottom-left',
  space: 0
};
