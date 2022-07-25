import clsx from 'clsx';
import React, { ChangeEvent, FC, useState } from 'react';

import styles from './CheckBox.module.scss';

/**
 * @param id - строка для связки лейбла и чекбокса
 * @param name - строка с именем чекбокса
 * @param label - строка - текст который ссылается на чекбокс
 * @param disabled - булево значение, задизейблен ли чекбокс
 * @param onChange - функция выполняющаяся при нажатии на чекбокс
 * @param className - класс для стилизации чекбокса
 * @param value - значние чекбокса
 * @param bgColor - цвет фона
 */

interface ICheckBoxProps {
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  wrapperClass?: string;
  labelClass?: string;
  value: string;
  blueBGColor?: string;
  checked: boolean;
}

const CheckBox: FC<ICheckBoxProps> = ({
  id,
  name,
  label,
  disabled,
  onChange,
  wrapperClass,
  labelClass,
  value,
  checked,
  blueBGColor,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const wrapperClasses = clsx(styles.wrapper, wrapperClass);
  const labelClasses = clsx(styles.label, labelClass);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange(event);
  };

  return (
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
        <span className={blueBGColor ? styles.blueBgColor : styles.mark} />
      </span>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </label>
  );
};

export default CheckBox;
