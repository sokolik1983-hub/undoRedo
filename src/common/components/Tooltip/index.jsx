import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Tooltip.module.scss';

/**
 * @param children - нода, оборачиваемая компонентом Tooltip
 * @param content - строка, текст подсказки, который отображает компонент Tooltip
 * @param style - объект, внешние стили для кастомизации компонента
 * @param position - строка, положение подсказки относительно оборачиваемой ноды: top, left, bottom, right, по дефолту - top
 */

const Tooltip = ({ children, content, style, position }) => {
  const [visible, setVisible] = useState(false);

  const classes = clsx(styles.tooltip, styles[position]);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  return (
    <span className={styles.tooltipWrapper}>
      {visible && (
        <span style={style} className={classes}>
          {content}
        </span>
      )}
      <span
        onMouseEnter={show}
        onMouseLeave={hide}
        className={styles.targetElement}
      >
        {children}
      </span>
    </span>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  style: PropTypes.objectOf(PropTypes.string)
};

Tooltip.defaultProps = {
  content: '',
  style: {},
  position: 'top'
};
