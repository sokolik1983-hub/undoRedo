import clsx from 'clsx';
import React, {
  DetailedHTMLProps,
  FC,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

import styles from './TextInput.module.scss';

/**
 * @param id - уникальное значние для инпута
 * @param className - классы для кастомизации инпута
 * @param labelClassName - классы для кастомизации лейбла
 * @param label - строка содеражащая текст лейбла инпута
 * @param error - строка содержащая текст ошибки при валидации
 * @param onChange - функция для получения значения инпута
 * @param value - значение инпута
 * @param fullwidth - булево значние, предназначенное для растягивания инпута на всю ширину родительского элемента
 * @param props - передаваемые атрибуты
 */

interface ITextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id?: string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  uppercase?: boolean;
  defaultValue?: string;
  requiredTextVisible?: boolean;
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, ITextInputProps> = (
  {
    id,
    className,
    wrapperClassName,
    labelClassName,
    label,
    error,
    onChange,
    value,
    fullWidth = false,
    uppercase,
    defaultValue,
    ...props
  },
  ref,
) => {
  const classes = clsx(
    styles.input,
    className,
    { [styles.error]: error },
    { [styles.fullWidth]: className ? false : fullWidth },
    { [styles.uppercase]: uppercase },
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
        <span className={styles.inputRequired}>
          {props.requiredTextVisible ? 'Required' : ''}
        </span>
      )}
      <input
        ref={ref}
        name={id}
        className={classes}
        defaultValue={defaultValue}
        {...props}
      />
      {error && <span className={styles.textError}>{error}</span>}
    </div>
  );
};

export default forwardRef(TextInput);
