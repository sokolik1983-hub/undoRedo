import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '../../IconButton';
import { ReactComponent as SingleColumnInactive } from '../../../../layout/assets/toggleSingleColumnInactive.svg';
import { ReactComponent as SingleColumnActive } from '../../../../layout/assets/toggleSingleColumnActive.svg';
import { ReactComponent as MultipleColumnsActive } from '../../../../layout/assets/toggleMultipleColumnsActive.svg';
import { ReactComponent as MultipleColumnsInctive } from '../../../../layout/assets/toggleMultipleColumnsInactive.svg';
import styles from './ListNavBarViewToggler.module.scss';

const ListNavBarViewToggler = ({ isMulticolumnsView, showMultipleColumns }) => {
  const btnMultiView = clsx(styles.btn, {
    [styles.multicolumnView]: isMulticolumnsView
  });
  const btnTableView = clsx(styles.btn, {
    [styles.tableView]: !isMulticolumnsView
  });

  return (
    <div className={styles.viewToggle}>
      <IconButton
        className={btnMultiView}
        icon={
          isMulticolumnsView ? (
            <MultipleColumnsActive />
          ) : (
            <MultipleColumnsInctive />
          )
        }
        onClick={() => showMultipleColumns(true)}
      />
      <IconButton
        className={btnTableView}
        icon={
          isMulticolumnsView ? <SingleColumnInactive /> : <SingleColumnActive />
        }
        onClick={() => showMultipleColumns(false)}
      />
    </div>
  );
};

export default ListNavBarViewToggler;

ListNavBarViewToggler.propTypes = {
  showMultipleColumns: PropTypes.func,
  isMulticolumnsView: PropTypes.bool
};
