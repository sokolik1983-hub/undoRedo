import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Icon.module.scss';

/**
 * @param size - строка,размер иконки, один из small, medium, large, по умолчанию medium
 * @param className - строка, внешний класс для стилизации иконки
 * @param children - иконка, которую отрисует компонент Icon
 */

const Icon = ({ size, className, children, color, src, ...props }) => {
  const classes = clsx(className, styles.icon, [styles[size]], [styles[color]]);

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Icon;

Icon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  src: PropTypes.string
};

Icon.defaultProps = {
  size: 'default',
  className: '',
  children: null,
  color: ''
};
