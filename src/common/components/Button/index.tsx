import clsx from 'clsx';
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
  SyntheticEvent,
} from 'react';

import { BUTTON, EMPTY_STRING } from '../../constants/common';
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
 * @param buttonStyle - стиль кнопки
 */

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode | string | number;
  onClick: (e: SyntheticEvent) => void;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  buttonStyle?: BUTTON;
}

const Button: FC<IButtonProps> = ({
  children,
  onClick,
  className = EMPTY_STRING,
  disabled = false,
  active = false,
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
    { [styles.bigRed]: buttonStyle === BUTTON.BIG_RED },
    { [styles.smallOrange]: buttonStyle === BUTTON.SMALL_ORANGE },
    className,
    { active },
    { [styles.disabled]: disabled },
  );

  const onClickAction = (event) => {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick(event);
    }
  };

  return (
    <button
      className={classes}
      onClick={onClickAction}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
