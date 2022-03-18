import { SQL_OPERATORS, TABLE1_EXAMPLE, TABLE2_EXAMPLE } from '../../../../../common/constants/universes';
import styles from '../../ObjectsConnectionsEditor.module.scss';

const SqlMiddleContent = () => {
  const tables = [TABLE1_EXAMPLE, TABLE2_EXAMPLE];
  
  return (
    <div className={styles.sqlMainContent}>
      <div className={styles.sqlTables}>
        <span className={styles.tableName}>Таблицы, столбцы</span>
        <select
          className={styles.selectColumn}
          multiple
        >
          {tables.map(table => (
            <>
              <option value={table.id} name={table.name}>
                {table.name}
              </option>
              {table.columns.map(column => (
                <option
                  name={column.name}
                  value={column.id}
                  className={styles.tableColumnName}
                >
                  {column.name}
                </option>
              ) )}
            </>

            )
            )}
        </select>
      </div>
      <div className={styles.sqlOperators}>
        <span className={styles.tableName}>Операторы</span>
        <select
          className={styles.selectColumn}
          multiple
        >
          {SQL_OPERATORS.map(item => 
            <option value={item.action} name={item.action}>{item.text}</option> )}
        </select>
      </div>
      <div className={styles.sqlFunctions}>
        <span className={styles.tableName}>Функции</span>
        <select
          className={styles.selectColumn}
          multiple
        >
          <option>asd</option>
          <option>qwe</option>
          <option>zxc</option>
          <option>asd</option>
          <option>qwe</option>
          <option>zxc</option>
          <option>asd</option>
          <option>qwe</option>
          <option>zxc</option>
          <option>asd</option>
          <option>qwe</option>
          <option>zxc</option>
        </select>
      </div>
    </div>
  )
};

export default SqlMiddleContent;
