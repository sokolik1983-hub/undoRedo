import { useField } from 'formik';
import React, { FC } from 'react';

import Radio from '../Radio';

interface IRadioFieldProps {
  name: string;
  value: string;
  label: string;
}

const RadioField: FC<IRadioFieldProps> = ({ name, value, label, ...props }) => {
  const [field] = useField({ name, value, type: 'radio' });
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
  );
};

export default RadioField;
