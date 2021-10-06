import PropTypes from 'prop-types'
import React from 'react';
import Option from './option';

const Select = ({ name, options }) => {
  return (
    <select name={name || 'select'}>
      {
        options.map(item => {
          return (
            <Option text={item.text} value={item.value} />
          )
        })
      }
    </select>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ),
}