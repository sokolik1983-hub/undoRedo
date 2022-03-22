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
 * @param buttonStyle - атрибут стиля кнопки
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
    { [styles.EDIT]: buttonStyle === 'EDIT' },
    { [styles.TESTCONNECTION]: buttonStyle === 'TESTCONNECTION' },
    { [styles.SAVE]: buttonStyle === 'SAVE' },
    { [styles.CANCEL]: buttonStyle === 'CANCEL' },
    { [styles.ADD]: buttonStyle === 'ADD' },
    { [styles.CHANGE]: buttonStyle === 'CHANGE' },
    { [styles.DELETE]: buttonStyle === 'DELETE' },
    { [styles.TEST]: buttonStyle === 'TEST' },
    { [styles.GOTIT]: buttonStyle === 'GOTIT' },
    { [styles.SEEMSTOBEOK]: buttonStyle === 'SEEMSTOBEOK' },
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

  let buttonText = '';

  switch (buttonStyle) {
    case 'EDIT':
      buttonText = 'Редактировать';
      break;
    case 'TESTCONNECTION':
      buttonText = 'Тест соединения';
      break;
    case 'SAVE':
      buttonText = 'Сохранить';
      break;
    case 'CANCEL':
      buttonText = 'Отмена';
      break;
    case 'ADD':
      buttonText = 'Добавить';
      break;
    case 'CHANGE':
      buttonText = 'Заменить';
      break;
    case 'DELETE':
      buttonText = 'Удалить';
      break;
    case 'TEST':
      buttonText = 'Тестировать';
      break;
    case 'GOTIT':
      buttonText = 'Я понял';
      break;
    case 'SEEMSTOBEOK':
      buttonText = 'Вроде все правильно...';
      break;
    default:
      buttonText = 'Нажать';
      break;
  }

  return (
    <Tag
      {...props}
      className={classes}
      onClick={onClickAction}
      disabled={disabled}
      type={Tag === 'button' ? props.type : null}
    >
      {buttonText}
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
