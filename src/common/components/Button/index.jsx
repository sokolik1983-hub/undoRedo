import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { BUTTON } from '../../constants/common';

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
 * @param buttonStyle - стиль кнопки
 */

const Button = ({
  children,
  onClick,
  className,
  disabled,
  active,
  size,
  color,
  buttonStyle,
  ...props
}) => {
  const classes = clsx(
    styles.btn,
    { [styles.bigBlue]: buttonStyle === BUTTON.BIG_BLUE },
    { [styles.bigOrange]: buttonStyle === BUTTON.BIG_ORANGE },
    { [styles.bigGray]: buttonStyle === BUTTON.BIG_GRAY },
    { [styles.brown]: buttonStyle === BUTTON.BROWN },
    { [styles.blue]: buttonStyle === BUTTON.BLUE },
    { [styles.gray]: buttonStyle === BUTTON.GRAY },
    { [styles.brownDarker]: buttonStyle === BUTTON.BROWN_DARKER },
    { [styles.red]: buttonStyle === BUTTON.RED },  
    className,
    { active },
    [styles[size]],
    [styles[color]]
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
  type: PropTypes.string,
  buttonStyle: PropTypes.string
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
