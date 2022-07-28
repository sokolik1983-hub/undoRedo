import React, { FC, ReactNode } from 'react';

/**
 * @param title - заголовок
 * @param className - класс
 * @param titleClassName - класс для заголовка
 * @param children - нода для отрисовки внутри элемента
 */

interface ISimpleDropDownProps {
  title: string;
  className?: string;
  iconClassName?: string;
  titleClassName: string;
  children?: ReactNode;
  icon?: ReactNode;
}

const SimpleDropDown: FC<ISimpleDropDownProps> = ({
  title,
  className,
  titleClassName,
  children,
  icon,
  iconClassName,
}) => {
  return (
    <details className={className}>
      <summary className={titleClassName}>
        {icon && <span className={iconClassName}>{icon}</span>}
        {title}
      </summary>
      {children}
    </details>
  );
};

export default SimpleDropDown;
