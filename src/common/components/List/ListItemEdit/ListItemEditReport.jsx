import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import styles from './ListItemEdit.module.scss';

const ListItemEditReport = ({ newValue, setNewValue, onBlur }) => {

  return (
    <TextInput
      className={styles.listItemEdit}
      value={newValue}
      onChange={e => setNewValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default ListItemEditReport;

ListItemEditReport.propTypes = {
  newValue: PropTypes.string,
  setNewValue: PropTypes.func,
  onBlur: PropTypes.func
};