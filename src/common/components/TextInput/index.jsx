import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './TextInput.module.scss';

/**
 * @param id - уникальное значние для инпута
 * @param className - классы для кастомизации инпута
 * @param labelClassName - классы для кастомизации лейбла
 * @param label - строка содеражащая текст лейбла инпута
 * @param error - строка содержащая текст ошибки при валидации
 * @param onChange - функция для получения значения инпута
 * @param onFocus - функция, которая выполнится, когда инпут будет в фокусе
 * @param onBlur - функция, которая выполнится когда произодйет выходи из фокуса инпута
 * @param value - значение инпута
 * @param fullwidth - булево значние, предназначенное для растягивания инпута на всю ширину родительского элемента
 * @param props - передаваемые атрибуты
 */

const TextInput = forwardRef(
  (
    {
      id,
      className,
      wrapperClassName,
      labelClassName,
      label,
      error,
      onChange,
      onFocus,
      onBlur,
      value,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      styles.input,
      className,
      { [styles.error]: error },
      { [styles.fullWidth]: className ? false : fullWidth }
    );

    const wrapperClasses = clsx(styles.inputWrapper, wrapperClassName);

    const labelClasses = clsx(styles.inputLabel, labelClassName);

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={labelClasses} htmlFor={id}>
            {label}
          </label>
        )}
        {props.required && (
          <span className={styles.inputRequired}>Required</span>
        )}
        <input
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          name={id}
          className={classes}
          {...props}
          value={value}
        />
        {error && <span className={styles.textError}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool
};

TextInput.defaultProps = {
  className: '',
  wrapperClassName: '',
  labelClassName: '',
  label: '',
  error: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  fullWidth: false
};
