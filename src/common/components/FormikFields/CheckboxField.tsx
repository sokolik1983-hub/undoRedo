import { useField } from 'formik';
import React, { FC } from 'react';

import CheckBox from '../CheckBox';

interface ICheckboxFieldProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  id: string;
  wrapperClass?: string;
}

const CheckboxField: FC<ICheckboxFieldProps> = ({
  name,
  value,
  label,
  checked,
  id,
  ...props
}) => {
  const [field] = useField({ name, value, type: 'checkbox' });
  const { name: fieldName, onChange, value: fieldValue } = field;

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
  );
};

export default CheckboxField;
