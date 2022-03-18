import React from 'react'
import { useField } from 'formik';
import PropTypes from 'prop-types';
import CheckBox from '../CheckBox';

const CheckboxField = ({ name, value, label, ...props }) => {
  const [ field ] = useField({ name, value, type: 'checkbox' });
  const { name: fieldName, checked, onChange, value: fieldValue } = field;

  return (
    <CheckBox
      id={`checkbox-${value}`}
      name={fieldName}
      value={fieldValue}
      label={label}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
};

CheckboxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default CheckboxField;