import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

/**
 * @param children - нода для отрисовки внутри кнопки
 * @param onClick - функция - обработчик события клика на кнопку
 * @param className - класс, который добавится кнопке
 * @param disabled - булево значение, которое дизейблит кнопку
 * @param active - булево значение для определения активного состояния
 * @param size - размер кнопки из трех: small, medium , large, по умолчанию medium
 * @param props - атрибуты кнопки
 * @param color - строка определяющая цвет кнопки: primary, danger, success
 * @param props - атрибуты кнопки
 */

const Button = ({
  children,
  onClick,
  className,
  disabled,
  active,
  size,
  color,
  ...props
}) => {
  const classes = clsx(
    styles.btn,
    className,
    { active },
    { [styles.small]: size === 'small' },
    { [styles.medium]: size === 'medium' },
    { [styles.large]: size === 'large' },
    { [styles.danger]: color === 'danger' },
    { [styles.primary]: color === 'primary' },
    { [styles.sucess]: color === 'sucess' }
  );

  const onClickAction = event => {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick(event);
    }
  };

  const Tag = props.href ? 'a' : 'button';

  return (
    <Tag
      {...props}
      className={classes}
      onClick={onClickAction}
      disabled={disabled}
      type={Tag === 'button' ? props.type : null}
    >
      {children}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  children: 'Default button',
  onClick: () => {},
  className: '',
  disabled: false,
  active: false,
  size: 'medium',
  color: ''
};

export default Button;
