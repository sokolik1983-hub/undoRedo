import PropTypes from 'prop-types';
import styles from './ListColumnsView.module.scss';

const ListColumnsView = ({ listItems }) => {
  return <div className={styles.listColumnsView}>{listItems}</div>;
};

export default ListColumnsView;

ListColumnsView.propTypes = {
  listItems: PropTypes.array
};
