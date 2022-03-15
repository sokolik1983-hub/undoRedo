import PropTypes from 'prop-types';
import IconButton from '../../IconButton';
import { ReactComponent as SingleColumn } from '../../../../layout/assets/toggle-single-column.svg';
import { ReactComponent as MultipleColumns } from '../../../../layout/assets/toggle-multiple-columns.svg';
import styles from './ListNavBarViewToggler.module.scss';

const ListNavBarViewToggler = ({ showMultipleColumns }) => {
  return (
    <div className={styles.viewToggle}>
      <IconButton
        className={styles.btn}
        icon={<MultipleColumns />}
        onClick={() => showMultipleColumns(true)}
      />
      <IconButton
        className={styles.btn}
        icon={<SingleColumn />}
        onClick={() => showMultipleColumns(false)}
      />
    </div>
  );
};

export default ListNavBarViewToggler;

ListNavBarViewToggler.propTypes = {
  showMultipleColumns: PropTypes.func
};
