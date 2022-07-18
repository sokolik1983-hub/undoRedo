import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param name - имя DatePicker для HTML
 * @param onDateSelect - возвращает выбранное значение
 */

const DatePicker = ({ name, onDateSelect }) => {
  const handleItemSelect = (e) => {
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

DatePicker.propTypes = {
  name: PropTypes.string,
  onDateSelect: PropTypes.func,
};

DatePicker.defaultProps = {
  name: '',
  onDateSelect: () => {
    // something
  },
};
