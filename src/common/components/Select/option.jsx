import PropTypes from 'prop-types'
import React from 'react';

const Option = ({ value, text }) => {
  return (
    <option value={value}>
      {text}
    </option>
  )
}

export default Option;

Option.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}
