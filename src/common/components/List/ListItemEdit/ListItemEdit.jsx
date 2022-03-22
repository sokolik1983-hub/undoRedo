import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import styles from './ListItemEdit.module.scss';

const ListItemEdit = ({ value, onSubmit, onBlur }) => {
  const [newValue, setNewValue] = useState();
  const inputRef = useRef();
  console.log(inputRef?.current?.value);

  useEffect(() => {
    setNewValue(value);
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, [inputRef.current]);

  return (
    <form className={styles.listItemEditForm} onSubmit={onSubmit}>
      <TextInput
        className={styles.listItemEdit}
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
        ref={inputRef}
        onBlur={onBlur}
      />
    </form>
  );
};

export default ListItemEdit;

ListItemEdit.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onBlur: PropTypes.func
};
