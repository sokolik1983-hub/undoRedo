import clsx from 'clsx';
import React from 'react';

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

const IconButton = ({
    children,
    onClick,
    size,
    color,
    disabled,
    className,
    active,
    icon,
    ...props
}) => {
    const classes = clsx(
        styles.iconButton,
        className,
        {[styles.active]: active},
        [styles[size]],
    );

    const onClickAction = (event) => {
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
            disabled={disabled}
            type="button"
            className={classes}
            onClick={onClickAction}
        >
            <span className={styles.icon} color={color} size={size}>
                {icon}
            </span>
        </Tag>
    );
};

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
