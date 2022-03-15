import PropTypes from 'prop-types';
import styles from './ListTableView.module.scss';

const ListTableView = ({ tableHeader, tableRows }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.listTable}>
        {/* TODO: make dynamic cols count */}
        <colgroup>
          <col span="1" />
          <col span="1" style={{ width: '15%' }} />
          <col span="1" style={{ width: '15%' }} />
          <col span="1" style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ListTableView;

ListTableView.propTypes = {
  tableHeader: PropTypes.array,
  tableRows: PropTypes.array
};
