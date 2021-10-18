import React from 'react';
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
  className,
  value,
  ...props
}) => {
  const [checked, setChecked] = React.useState(false);

  const classes = clsx(styles.checkBox, className);

  const handleChange = event => {
    setChecked(event.target.checked);
    onChange(event);
  };

  return (
    <div className={classes}>
      <label htmlFor={id}>
        <input
          id={id}
          value={value}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string
};

CheckBox.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  onChange: () => {}
};
