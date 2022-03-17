import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Select from '../../../../common/components/Select';
import styles from '../ObjectsConnectionsEditor.module.scss';
import CheckBox from '../../../../common/components/CheckBox';

const ConnectionTable = ({tableName, tables}) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [defaultValue, setDefaultValue] = useState('Выберите таблицу');

  const getTablesOptions = () => {
    return tables.map(item => {return {value: item.id.toString(), text: item.name}})
  }

  const getTableData = value => {
    const table = tables.filter(item => {
      return item.id.toString() === value
    });
    setSelectedTable(table[0])
  }

  useEffect(() => {
    if (selectedTable) setDefaultValue('');
  }, [selectedTable]);

  return (
    <div className={styles.tableContent}>
      <span className={styles.tableName}>{tableName}</span>
      <Select
        name='tableSelect'
        options={getTablesOptions()}
        defaultValue={defaultValue}
        onSelectItem={e => getTableData(e)}
      />
      <span className={styles.columnTitle}>Столбцы</span>
      <select
        className={styles.selectColumn}
        multiple
      >
        {selectedTable && selectedTable.columns.map(item => (<option value={item.name} key={item.id}>{item.name}</option>))}
      </select>
      <div className={styles.outsideConnectCheckbox}>
        <CheckBox wrapperClass={styles.checkBoxWrapper} label='Внешнее объединение' />
      </div>
    </div>
  )
};

export default ConnectionTable;

ConnectionTable.propTypes = {
  tableName: PropTypes.string,
  tables: PropTypes.array,
}
