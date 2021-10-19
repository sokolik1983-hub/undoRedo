import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/index';
import Button from '../Button/index';
import styles from './IconButton.module.scss';

const IconButton = ({ children, textContent, onClick }) => {
  return (
    <Button className={styles.iconButton} onClick={onClick}>
      {textContent}
      <Icon color="primary">{children}</Icon>
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  children: PropTypes.node,
  textContent: PropTypes.string,
  onClick: PropTypes.func
};

IconButton.defaultProps = {
  children: null,
  textContent: '',
  onClick: () => {}
};
