import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/index';
import Icon from '../Icon/index';

const IconButton = ({ children, textContent, onClick, ...props }) => {
  const classes = clsx();

  console.log(classes);

  return (
    <Button onClick={onClick}>
      {textContent}
      <Icon>{children}</Icon>
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  children: PropTypes.node
};
