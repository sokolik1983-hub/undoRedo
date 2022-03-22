import PropTypes from 'prop-types';
import styles from './ListTableView.module.scss';

const ListTableView = ({ tableHeader, tableRows }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.listTable}>
        <colgroup>
          {tableHeader.map(i => (
            <col key={i.props.children} span="1" />
          ))}
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
