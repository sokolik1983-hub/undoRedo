import React, { ChangeEvent, FC } from 'react';

/**
 * @param name - имя DatePicker для HTML
 * @param onDateSelect - возвращает выбранное значение
 */

interface IDatePickerProps {
  name: string;
  onDateSelect: (el: string) => void;
}

const DatePicker: FC<IDatePickerProps> = ({ name, onDateSelect }) => {
  const handleItemSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onDateSelect(e.target.value);
  };

  return (
    <input
      type="date"
      name={name || 'datePicker'}
      onChange={handleItemSelect}
    />
  );
};

export default DatePicker;
