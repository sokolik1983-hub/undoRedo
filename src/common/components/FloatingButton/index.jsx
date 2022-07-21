import PropTypes from 'prop-types';
import React from 'react';

import UnionIcon from '@src/layout/assets/Union.svg';

import styles from './FloatingButton.module.scss';

/**
 * @param onClick - функция - обработчик события клика на кнопку
 * @param icon - иконка кнопки
 * @param text - текст кнопки
 */

const FloatingButton = ({ onClick, text }) => {
  const onClickAction = (event) => {
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

FloatingButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  text: PropTypes.string,
};

FloatingButton.defaultProps = {
  onClick: () => {
    // something
  },
  icon: null,
  text: '',
};

export default FloatingButton;
