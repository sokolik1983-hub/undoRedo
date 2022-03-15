import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Gears.module.scss';

/**
 * @param className - класс
 * @param isSpinning - булево значение, которое останавливает вращение шестеренок
 */

const top = clsx(styles.circles, styles.no1);
const middle = clsx(styles.circles, styles.no2);
const bottom = clsx(styles.circles, styles.no3);

const Gears = ({isSpinning, className}) => {
  return (
    <div className={className}>
      <div className={isSpinning ? top : clsx(top, styles.stop)} />
      <div className={isSpinning ? middle : clsx(middle, styles.stop)} />
      <div className={isSpinning ? bottom : clsx(bottom, styles.stop)} />
    </div>
  );
};

export default Gears;

Gears.propTypes= {
  isSpinning: PropTypes.bool,
  className: PropTypes.string,
};

Gears.defaultProps = {
  isSpinning: false,
  className: '',
};