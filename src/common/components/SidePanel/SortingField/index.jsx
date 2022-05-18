import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SortingField.module.scss';
import Select from '../../Select';
import { ReactComponent as CloseIcon } from '../../../../layout/assets/close.svg';

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
    <div className={styles.root}>
      <Select
        options={options}
        onSelectItem={handleChangeField}
        className={styles.select}
      />
      <Select
        options={[
          { value: 'ASC', text: 'ASC' },
          { value: 'DESC', text: 'DESC' }
        ]}
        onSelectItem={handleChangeSorting}
        className={styles.select}
      />
      <CloseIcon onClick={handleRemoveField} className={styles.closeIcon} />
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
