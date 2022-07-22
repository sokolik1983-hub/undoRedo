import clsx from 'clsx';
import React, { FC, ReactNode, useState } from 'react';

import Arrow from '../../../layout/assets/semanticLayerModal/arrow.svg';
import Divider from '../Divider';
import styles from './Accordion.module.scss';

/**
 * @param title - строка для заголовка
 * @param noPadding - отсутствие нижнего отступа у элемента
 * @param children - нода для отрисовки контента
 * @param indents - вариант отступов
 * @param withDivider - булево, добавляет разделительную полосу
 * @param isAccordionOpened - раскрыт ли аккордеон по умолчанию
 */

interface IAccordionProps {
  title: string;
  noPadding: boolean;
  children: ReactNode;
  indents: string;
  titleClassName: string;
  withDivider: boolean;
  isAccordionOpened: boolean;
}

const Accordion: FC<IAccordionProps> = ({
  title,
  noPadding,
  children,
  indents,
  titleClassName,
  withDivider,
  isAccordionOpened,
}) => {
  const [isActive, setIsActive] = useState(isAccordionOpened);
  const contentClasses = clsx(styles.content, indents, {
    [styles.contentNoPadding]: noPadding,
  });
  const titleClasses = clsx(styles.title, titleClassName);

  return (
    <div className={styles.item}>
      <div className={titleClasses} onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>
          <Arrow
            stroke="white"
            fill="none"
            className={isActive ? styles.arrowActive : ''}
          />
        </div>
      </div>
      {withDivider && (
        <div className={styles.divider}>
          <Divider color="#FFFFFF" />
        </div>
      )}
      {isActive && <div className={contentClasses}>{children}</div>}
    </div>
  );
};

export default Accordion;
