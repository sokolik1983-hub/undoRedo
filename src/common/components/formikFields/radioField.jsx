import React from 'react'
import { useField } from 'formik';
import PropTypes from 'prop-types';
import Radio from '../Radio';

const RadioField = ({ name, value, label, ...props }) => {
  const [ field ] = useField({ name, value, type: 'radio' });
  const { name: fieldName, checked, onChange, value: fieldValue } = field;

  return (
    <Radio
      id={`radio-${value}`}
      name={fieldName}
      value={fieldValue}
      label={label}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
};

RadioField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioField;