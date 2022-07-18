import PropTypes from 'prop-types';
import React from 'react';

import styles from './FloatingButton.module.scss';

/**
 * @param onClick - функция - обработчик события клика на кнопку
 * @param icon - иконка кнопки
 * @param text - текст кнопки
 * @param props - атрибуты кнопки
 */

const FloatingButton = ({ onClick, icon, text, ...props }) => {
  const onClickAction = (event) => {
    onClick(event);
  };

  return (
    <div {...props} className={styles.btn} onClick={onClickAction}>
      <div className={styles.icon}>{icon}</div>
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
