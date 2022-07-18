import clsx from 'clsx';
import React, { FC, ReactEventHandler, ReactNode } from 'react';

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

interface IconButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  size?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  active?: boolean;
  icon?: ReactNode;
  href?: string;
  type?: string;
}

const defaultProps = {
  children: null,
  onClick: () => {
    // some action
  },
  size: 'medium',
  color: '',
  disabled: false,
  icon: null,
};

const IconButton: FC<IconButtonProps> = ({
  children,
  onClick,
  size,
  color,
  disabled,
  className,
  active,
  icon,
  href,
}) => {
  const classes = clsx(
    styles.iconButton,
    className,
    { [styles.active]: active },
    // @ts-ignore
    [styles[size]],
  );

  const onClickAction = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
    } else {
      if (onClick) {
        onClick(event);
      }
    }
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      disabled={disabled}
      type="button"
      className={classes}
      onClick={onClickAction}
    >
      <span className={styles.icon} color={color}>
        {icon}
      </span>
    </Tag>
  );
};
IconButton.defaultProps = defaultProps;

export default IconButton;
//
// IconButton.propTypes = {
//     children: PropTypes.node,
//     onClick: PropTypes.func,
//     size: PropTypes.string,
//     color: PropTypes.string,
//     disabled: PropTypes.bool,
//     active: PropTypes.bool,
//     className: PropTypes.string,
//     href: PropTypes.string,
//     icon: PropTypes.node,
// };
//
// IconButton.defaultProps = {
//     children: null,
//     onClick: () => {
//         // something
//     },
//     size: 'medium',
//     color: '',
//     disabled: false,
//     icon: null,
// };
