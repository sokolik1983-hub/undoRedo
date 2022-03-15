import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './CheckBox.module.scss';

/**
 * @param id - строка для связки лейбла и чекбокса
 * @param name - строка с именем чекбокса
 * @param label - строка - текст который ссылается на чекбокс
 * @param disabled - булево значение, задизейблен ли чекбокс
 * @param onChange - функция выполняющаяся при нажатии на чекбокс
 * @param className - класс для стилизации чекбокса
 * @param value - значние чекбокса
 */

const CheckBox = ({
  id,
  name,
  label,
  disabled,
  onChange,
  wrapperClass,
  labelClass,
  value,
  checked,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const wrapperClasses = clsx(styles.wrapper, wrapperClass);
  const labelClasses = clsx(styles.label, labelClass);

  const handleChange = () => {
    setIsChecked(prev => !prev);
    onChange(isChecked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={wrapperClasses}>
      <span className={styles.container}>
        <input
          id={id}
          value={value}
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
          {...props}
        />
        <span className={styles.mark} />
      </span>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label htmlFor={id} className={labelClasses} onClick={handleChange}>
        {label}
      </label>
    </label>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  wrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool
};

CheckBox.defaultProps = {
  id: '',
  name: '',
  label: '',
  wrapperClass: '',
  labelClass: '',
  value: '',
  checked: false,
  disabled: false,
  onChange: () => {}
};
