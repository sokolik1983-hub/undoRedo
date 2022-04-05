import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import styles from './HomePageButton.module.scss';

const HomePageButton = ({ title, href, icon, isDocument }) => {
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
            title === 'Приложения' ? styles.buttonText : styles.buttonTextApps
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
