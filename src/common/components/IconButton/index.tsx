import clsx from 'clsx';
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from 'react';

import { EMPTY_STRING } from '@src/common/constants/common';

import styles from './IconButton.module.scss';

/**
 * @param children - иконка, которую отрисует компонент IconButton
 * @param onClick - функция - обработчик события клика на кнопку
 * @param size - размер кнопки из трех: small, medium , large, по умолчанию medium
 * @param color - строка определяющая цвет кнопки: primary, danger, success
 * @param disabled - булево значение, которое дизейблит кнопку
 * @param className - класс, который добавится кнопке
 * @param active - булево значение для определения активного состояния
 * @param icon - иконка для кнопки
 */

interface IconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  iconStyle?: string;
  active?: boolean;
  icon?: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({
  size = 'medium',
  color = EMPTY_STRING,
  disabled,
  className,
  iconStyle,
  active,
  icon,
  ...props
}) => {
  const classes = clsx(
    styles.iconButton,
    className,
    { [styles.active]: active },
    // [styles[size]],
  );

  const iconClassName = clsx(styles.icon, iconStyle);

  return (
    <button disabled={disabled} className={classes} {...props}>
      <span className={iconClassName} color={color}>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
