import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import styles from './homePageButton.module.scss';

const HomePageButton = ({ title, href, icon, isDocument }) => {
  const appWordsArray = [
    'коннекторы',
    'семантика',
    'аудит',
    'роли',
    'пользователи',
    'документы',
    'корзина'
  ];
  return (
    <div className={styles.homePageButtonWrapper}>
      <RouterLink to={href || ''}>
        <div
          className={
            isDocument ? styles.homePageDocumentButton : styles.homePageButton
          }
        >
          {icon}
        </div>
        <div
          className={
            appWordsArray.includes(title)
              ? styles.buttonTextApps
              : styles.buttonText
          }
        >
          {title}
        </div>
      </RouterLink>
    </div>
  );
};

HomePageButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  isDocument: PropTypes.bool
};

export default HomePageButton;
