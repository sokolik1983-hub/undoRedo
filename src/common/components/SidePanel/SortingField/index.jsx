import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../../Select';

function SortingField({ options, onChange, onRemove, item }) {
  const [field, setField] = useState(options[0].value);
  const [sortingType, setSortingType] = useState('ASC');

  useEffect(() => {
    onChange({ field, sortingType, id: item.id });
  }, []);

  function handleChangeSorting(value) {
    setSortingType(value);
    onChange({ field, sortingType: value, id: item.id });
  }
  function handleChangeField(value) {
    setField(value);
    onChange({ field: value, sortingType, id: item.id });
  }

  function handleRemoveField() {
    onRemove(item);
  }

  return (
    <div>
      <Select options={options} onSelectItem={handleChangeField} />
      <Select
        options={[
          { value: 'ASC', text: 'ASC' },
          { value: 'DESC', text: 'DESC' }
        ]}
        onSelectItem={handleChangeSorting}
      />
      <button type="button" onClick={handleRemoveField}>
        remove
      </button>
    </div>
  );
}

SortingField.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  options: PropTypes.array,
  item: PropTypes.object
};

export default SortingField;
