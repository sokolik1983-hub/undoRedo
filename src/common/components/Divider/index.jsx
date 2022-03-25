import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ color }) => {
  return (
    <div style={{height: '1px', width:'100%', background: `${color}`}} />
  );
};

export default Divider;

Divider.propTypes = {
  color: PropTypes.string
};