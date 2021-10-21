import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Icon.module.scss';

/**
 * @param size - строка,размер иконки, один из small, medium, large, по умолчанию medium
 * @param className - строка, внешний класс для стилизации иконки
 * @param children - иконка, которую отрисует компонент Icon
 */

const Icon = ({ size, className, children, color, ...props }) => {
  const classes = clsx(
    className,
    [styles[size]],
    [styles[color]]
  );

  return (
    <svg className={classes} {...props}>
      {children}
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string
};

Icon.defaultProps = {
  size: 'medium',
  className: '',
  children: null,
  color: ''
};
