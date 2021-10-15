import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './TextInput.module.scss';

/**
 * @param id - уникальное значние для инпута
 * @param className - классы для кастомизации инпута
 * @param label - строка содеражащая текст лейбла инпута
 * @param error - строка содержащая текст ошибки при валидации
 * @param onChange - функция для получения значения инпута
 * @param onFocus - функция, которая выполнится, когда инпут будет в фокусе
 * @param onBlur - функция, которая выполнится когда произодйет выходи из фокуса инпута
 * @param value - значение инпута
 * @param fullwidth - булево значние, предназначенное для растягивания инпута на всю ширину родительского элемента
 * @param attrs - передаваемые атрибуты
 */

const TextInput = ({
  id,
  className,
  label,
  error,
  onChange,
  onFocus,
  onBlur,
  value,
  fullWidth,
  ...attrs
}) => {
  const classes = cn(
    styles.input,
    className,
    { [styles.error]: error },
    { [styles.fullWidth]: className ? false : fullWidth }
  );

  const handleOnChange = event => {
    onChange(event.target.value);
  };

  const handleChangeFocus = () => {
    onFocus();
  };

  const handleBlur = () => {
    onBlur();
  };

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.inputlabel} htmlFor={id}>
          {label}
        </label>
      )}
      {attrs.required && <span className={styles.inputRequired}>Required</span>}
      <input
        onChange={handleOnChange}
        onFocus={handleChangeFocus}
        onBlur={handleBlur}
        name={id}
        className={classes}
        {...attrs}
        value={value}
      />
      {error && <span className={styles.textError}>{error}</span>}
    </div>
  );
};

export default TextInput;

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  fullWidth: PropTypes.bool
};

TextInput.defaultProps = {
  className: '',
  label: '',
  error: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  fullWidth: false
};
