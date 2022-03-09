import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Icon from '../Icon';
import styles from './IconButton.module.scss';

/**
 * @param children - иконка, которую отрисует компонент IconButton
 * @param onClick - функция - обработчик события клика на кнопку
 * @param size - размер кнопки из трех: small, medium , large, по умолчанию medium
 * @param color - строка определяющая цвет кнопки: primary, danger, success
 * @param disabled - булево значение, которое дизейблит кнопку
 * @param className - класс, который добавится кнопке
 * @param active - булево значение для определения активного состояния
 */

const IconButton = ({
  children,
  onClick,
  size,
  color,
  disabled,
  className,
  active,
  render,
  ...props
}) => {
  const classes = clsx(styles.iconButton, className, { active }, [
    styles[size]
  ]);

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
      disabled={disabled}
      type="button"
      className={classes}
      onClick={onClickAction}
      {...props}
    >
      {/* TODO: Remove Icon component */}
      <Icon color={color} size={size}>
        {render && render()}
      </Icon>
    </Tag>
  );
};

export default IconButton;

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  render: PropTypes.func
};

IconButton.defaultProps = {
  children: null,
  onClick: () => {},
  size: 'medium',
  color: '',
  disabled: false
};
