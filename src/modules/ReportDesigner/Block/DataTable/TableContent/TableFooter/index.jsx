/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './TableFooter.module.scss';

const TableFooter = ({ data = [], ...props }) => {
  if (!data || data.length === 0) return null;

  return (
    <tfoot className={styles.root}>
      <tr>
        <td>Footer</td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
