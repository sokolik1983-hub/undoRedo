import PropTypes from 'prop-types';
import clsx from 'clsx';
import Option from './Option';
import styles from './Select.module.scss';

/**
 * @param name - имя Select для HTML
 * @param options - передача элементов списка в виде [{value: '1', text: '1'},{}...]
 * @param defaultValue - значение по умолчанию, будет на первой строке
 * @param onSelectItem - возвращает выбранное значение
 * @param fullWidth - компонент занимает всю ширину контейнера
 */

const Select = ({ name, options, defaultValue, onSelectItem, fullWidth }) => {
  const classes = clsx(
    { [styles.isJustify]: fullWidth }, styles.content
  );

  const handleItemSelect = e => {
    onSelectItem(e.target.value);
  };

  return (
    <select
      className={classes}
      name={name || 'select'}
      onChange={handleItemSelect}
    >
      {defaultValue && <option selected>{defaultValue}</option>}
      {options.map(item => {
        return <Option text={item.text} value={item.value} key={item.text} />;
      })}
    </select>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  onSelectItem: PropTypes.func
};

Select.defaultProps = {
  name: '',
  options: [{ value: '', text: '' }],
  onSelectItem: () => {},
  fullWidth: false,
};
