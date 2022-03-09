import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextInput from '../TextInput';
import { ReactComponent as Magnifier } from '../../../layout/assets/magnifier.svg';
import IconButton from '../IconButton';
import styles from './Search.module.scss';

const Search = ({ className, onSubmit, value, onChange }) => {
  const classes = clsx(styles.searchForm, className);

  return (
    <form className={classes} onSubmit={onSubmit}>
      <IconButton
        className={styles.btn}
        render={() => <Magnifier />}
        type="submit"
      />
      <TextInput
        className={styles.searchInput}
        id="search"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default Search;

Search.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Search.defaultProps = {
  className: ''
};
