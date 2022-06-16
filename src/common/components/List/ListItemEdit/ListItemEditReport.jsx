import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import styles from './ListItemEdit.module.scss';

const ListItemEditReport = ({ newValue, setNewValue, onSubmit, onBlur }) => {
  
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.select();
  }, [inputRef.current]);

  return (
    <form className={styles.listItemEditForm} onSubmit={onSubmit}>
      <TextInput
        className={styles.listItemEdit}
        value={newValue}
        onChange={e => e.key === 'Enter' ? setNewValue(e.target.value) : setNewValue(e.target.value)}
        ref={inputRef}
        onBlur={onBlur}
      />
    </form>
  );
};

export default ListItemEditReport;

ListItemEditReport.propTypes = {
  newValue: PropTypes.string,
  setNewValue: PropTypes.func,
  onSubmit: PropTypes.func,
  onBlur: PropTypes.func
};