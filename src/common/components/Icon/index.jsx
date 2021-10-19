import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Icon.module.scss';

/**
 * @param size - строка,размер иконки, один из small, medium, large, по умолчанию medium
 * @param className - строка, внешний класс для стилизации иконки
 * @param children - иконка, которую отрисует компонент Icon
 */

const Icon = ({ size, className, children, ...props }) => {
  const classes = clsx(
    className,
    { [styles.small]: size === 'small' },
    { [styles.medium]: size === 'medium' },
    { [styles.large]: size === 'large' }
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Icon;

Icon.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

Icon.defaultProps = {
  size: 'medium',
  className: '', 
  children: null
};
