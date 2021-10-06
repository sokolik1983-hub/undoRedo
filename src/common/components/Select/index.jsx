import PropTypes from 'prop-types'
import React from 'react';
import Option from './option';

/**
 * @param name - имя Select для HTML
 * @param options - передача элементов списка в виде [{value: '1', text: '1'},{}...]
 * @param defaultValue - значение по умолчанию, будет на первой строке
 * @param onSelectItem - возвращает выбранное значение
 */

const Select = ({ name, options, defaultValue, onSelectItem }) => {
  return (
    <select
      name={name || 'select'}
      onChange={e => onSelectItem(e.target.value)}
    >
      { defaultValue && (
        <option selected>{defaultValue}</option>
      )}
      {
        options.map(item => {
          return (
            <Option text={item.text} value={item.value} />
          )
        })
      }
    </select>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ),
  defaultValue: PropTypes.string,
  onSelectItem: PropTypes.func,
}