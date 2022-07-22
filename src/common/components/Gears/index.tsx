import clsx from 'clsx';
import React, { FC } from 'react';

import styles from './Gears.module.scss';

/**
 * @param className - класс
 * @param isSpinning - булево значение, которое останавливает вращение шестеренок
 */

interface IGearsProps {
  isSpinning: boolean;
  className: string;
}

const top = clsx(styles.circles, styles.no1);
const middle = clsx(styles.circles, styles.no2);
const bottom = clsx(styles.circles, styles.no3);

const Gears: FC<IGearsProps> = ({ isSpinning, className }) => {
  return (
    <div className={className}>
      <div className={isSpinning ? top : clsx(top, styles.stop)} />
      <div className={isSpinning ? middle : clsx(middle, styles.stop)} />
      <div className={isSpinning ? bottom : clsx(bottom, styles.stop)} />
    </div>
  );
};

export default Gears;
