import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import styles from './HomePageButton.module.scss';

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
        <Tooltip key={title} placement="bottom" title={title} arrow>
          <div
            className={
              appWordsArray.includes(title)
                ? styles.buttonTextApps
                : styles.buttonText
            }
          >
            {title}
          </div>
        </Tooltip>
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
