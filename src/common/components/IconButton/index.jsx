import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/index';
import Icon from '../Icon/index';

const IconButton = ({ children, textContent, onClick }) => {
  const classes = clsx();

  return (
    <Button className={classes} onClick={onClick}>
      {textContent}
      <Icon>{children}</Icon>
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
