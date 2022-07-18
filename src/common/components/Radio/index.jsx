import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Radio.module.scss';

/**
 * @param id - строка для связки лейбла и радио
 * @param name - строка с именем радио
 * @param label - строка - текст который ссылается на радио
 * @param disabled - булево значение, задизейблен ли радио
 * @param onChange - функция выполняющаяся при нажатии на радио
 * @param className - класс для стилизации радио
 * @param value - значние радио
 */

const Radio = ({
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
  const wrapperClasses = clsx(styles.wrapper, wrapperClass);
  const labelClasses = clsx(styles.label, labelClass);

  const handleChange = (event) => onChange(event);

  const changeCb =
    !disabled && !checked
      ? handleChange
      : () => {
          // something
        };

  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={labelClasses}>
        <input
          id={id}
          value={value}
          name={name}
          type="radio"
          checked={checked}
          onChange={changeCb}
          disabled={disabled}
          className={styles.input}
          {...props}
        />
        <span className={styles.mark} />
        {label}
      </label>
    </div>
  );
};

export default Radio;

Radio.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  wrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

Radio.defaultProps = {
  id: '',
  name: '',
  label: '',
  wrapperClass: '',
  labelClass: '',
  value: '',
  checked: false,
  disabled: false,
  onChange: () => {
    // something
  },
};
