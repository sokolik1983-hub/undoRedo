import React, { FC } from 'react';

import UnionIcon from '@src/layout/assets/Union.svg';

import styles from './FloatingButton.module.scss';

/**
 * @param onClick - функция - обработчик события клика на кнопку
 * @param icon - иконка кнопки
 * @param text - текст кнопки
 */

interface IFloatingButtonProps {
  onClick: (event: React.MouseEvent) => void;
  text: string;
}

const FloatingButton: FC<IFloatingButtonProps> = ({ onClick, text }) => {
  const onClickAction = (event: React.MouseEvent<HTMLElement>) => {
    onClick(event);
  };

  return (
    <div className={styles.btn} onClick={onClickAction}>
      <div className={styles.icon}>
        <UnionIcon />
      </div>
      <span className={styles.label}>{text}</span>
    </div>
  );
};

export default FloatingButton;
