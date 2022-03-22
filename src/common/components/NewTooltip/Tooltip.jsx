/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { cloneElement, useRef, useState } from 'react';
import Portal from '../Portal/Portal';
import styles from './Tooltip.module.scss';

/**
 * @param children - нода, оборачиваемая компонентом Tooltip
 * @param className - кастомные стили
 * @param text - текст тултипа
 * @param placement - положение тултипа относительно элемента: 'bottom-left', 'bottom-right', 'top-left', 'top-right', 'left', 'right'
 * @param space - отступ тултипа от элемента
 * @param isCtrlHold - тултип появляется только при нажатом Ctrl
 * @param maxWidth - максимальная ширина тултипа. Default: 300px
 */

const newPlacement = position => ({
  current: position,
  flipX() {
    if (this.current === 'left') return 'right';
    if (this.current === 'right') return 'left';
    if (this.current === 'top-left') return 'top-right';
    if (this.current === 'top-right') return 'top-left';
    if (this.current === 'bottom-left') return 'bottom-right';
    if (this.current === 'bottom-right') return 'bottom-left';
  },
  flipY() {
    if (this.current === 'top-left') return 'bottom-left';
    if (this.current === 'top-right') return 'bottom-right';
    if (this.current === 'bottom-left') return 'top-left';
    if (this.current === 'bottom-right') return 'top-right';
  }
});

const getPoint = (elem, tooltip, placement, space) => {
  let point = { x: 0, y: 0 };
  const { top, bottom, left, right } = elem.getBoundingClientRect();
  const boundaries = {
    top: space,
    bottom: window.innerHeight - tooltip.offsetHeight - space,
    left: space,
    right: window.innerWidth - tooltip.offsetWidth - space
  };
  // Проверка: пересекает ли элемент правую границу
  const rightOverlap = right > window.innerWidth - space;
  // Проверка: пересекает ли элемент левую границу
  const leftOverlap = left < space;

  /* переменная count нужна для создания условия выхода из рекурсии,
   * в случае если тултип нигде не помещается
   */
  let count = 0;

  return (function recursive(placement) {
    count++;

    switch (placement) {
      case 'top-left': {
        point.x = leftOverlap ? space : left;
        point.y = top - tooltip.offsetHeight - space;
        break;
      }
      case 'top-right': {
        point.x = rightOverlap
          ? window.innerWidth - tooltip.offsetWidth - space
          : right - tooltip.offsetWidth;
        point.y = top - tooltip.offsetHeight - space;
        break;
      }
      case 'bottom-right': {
        point.x = rightOverlap
          ? window.innerWidth - tooltip.offsetWidth - space
          : right - tooltip.offsetWidth;
        point.y = top + elem.offsetHeight + space;
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
        point.x = leftOverlap ? space : left;
        point.y = bottom + space;
    }

    /* отменяем рекурсию если ни изначальное положение тултипа ни противоположное
     * не удовлетворяют граничным условиям
     */
    if (count > 2) return;

    // пересечение по вертикали и горизонтали
    const isUpAndRightIntersection =
      point.x > boundaries.right && point.y < boundaries.top;
    const isUpAndLeftIntersection =
      point.x < boundaries.left && point.y < boundaries.top;
    const isBottomAndRightIntersection =
      point.x > boundaries.right && point.y > boundaries.bottom;
    const isBottomAndLeftIntersection =
      point.x < boundaries.left && point.y > boundaries.bottom;
    // пересечение только по вертикали и горизонтали
    const isVerticalIntersection =
      point.y < boundaries.top || point.y > boundaries.bottom;
    const isHorizontalIntersection =
      point.x < boundaries.left || point.x > boundaries.right;

    if (isUpAndRightIntersection) point = recursive('bottom-right');
    if (isUpAndLeftIntersection) point = recursive('bottom-left');
    if (isBottomAndRightIntersection) point = recursive('top-right');
    if (isBottomAndLeftIntersection) point = recursive('top-left');
    if (isVerticalIntersection)
      point = recursive(newPlacement(placement).flipY());
    if (isHorizontalIntersection)
      point = recursive(newPlacement(placement).flipX());

    return point;
  })(placement);
};

const Tooltip = ({
  className,
  text,
  placement,
  space,
  isCtrlHold,
  maxWidth,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const tooltipClasses = clsx(styles.tooltip, className, {
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

  const handleMouseOverCtrl = e => {
    if (e.ctrlKey) {
      handleMouseOver(e);
    }
  };

  const handleMouseOut = () => {
    setIsDisabled(false);
    setIsVisible(false);
  };

  return (
    <>
      {cloneElement(children, {
        onMouseOver: isCtrlHold ? handleMouseOverCtrl : handleMouseOver,
        onMouseOut: handleMouseOut,
        onMouseDown: () => setIsDisabled(true)
      })}

      <Portal>
        {isDisabled ? null : (
          <span
            className={tooltipClasses}
            style={{
              top: `${positionRef?.current?.y}px`,
              left: `${positionRef?.current?.x}px`,
              maxWidth: `${maxWidth}px`
            }}
            ref={tooltipRef}
          >
            {text}
          </span>
        )}
      </Portal>
    </>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  className: PropTypes.string,
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
  space: PropTypes.any,
  isCtrlHold: PropTypes.bool,
  maxWidth: PropTypes.number
};

Tooltip.defaultProps = {
  placement: 'bottom-left',
  space: 0,
  maxWidth: 300
};
