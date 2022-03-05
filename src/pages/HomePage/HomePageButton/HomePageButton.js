import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import styles from './HomePageButton.module.scss';

const HomePageButton = ({ title, href, icon, isDocument }) => {
  return (
    <>
      <i className="fas fa-user" />
      <RouterLink to={href || ''}>
        <div className={styles.homePageButtonWrapper}>
          <div
            className={isDocument ? styles.homePageDocumentButton : styles.homePageButton}
          >
            {icon}
          </div>
          <div className={styles.buttonText}>{title}</div>
        </div>
      </RouterLink>
    </>
  );
};

HomePageButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  isDocument: PropTypes.bool
};

export default HomePageButton;
